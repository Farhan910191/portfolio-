"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { AnimatePresence, motion, type Variants } from "framer-motion";

import {
  Star,
  Send,
  Trash2,
  MessageSquare,
  Quote,
  CalendarDays,
  Plus,
  X,
  AlertTriangle,
} from "lucide-react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

import {
  onAuthStateChanged,
  signInAnonymously,
  type User,
} from "firebase/auth";

import { auth, db } from "@/lib/firebase";
import { useTheme } from "@/components/ThemeProvider";

// ======================================================
// TYPES
// ======================================================

type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  createdAt: string;
  ownerUid: string;
};

type ReviewForm = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

type FirestoreReview = {
  name: string;
  role: string;
  text: string;
  rating: number;
  createdAt?: Timestamp | null;
  ownerUid: string;
};

// ======================================================
// CONFIGURATION
// ======================================================

const COLLECTION_NAME = "testimonials";
const INITIAL_VISIBLE_COUNT = 4;

// ======================================================
// ANIMATIONS
// ======================================================

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

// ======================================================
// INITIAL FORM
// ======================================================

const initialForm: ReviewForm = {
  name: "",
  role: "",
  text: "",
  rating: 0,
};

// ======================================================
// STAR RATING
// ======================================================

function StarRating({
  rating,
  interactive = false,
  onChange,
}: {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayedRating = hoverRating || rating;

  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => setHoverRating(0)}
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          disabled={!interactive}
          aria-label={`${value} out of 5 stars`}
          aria-pressed={
            interactive ? rating === value : undefined
          }
          onMouseEnter={() => {
            if (interactive) setHoverRating(value);
          }}
          onFocus={() => {
            if (interactive) setHoverRating(value);
          }}
          onBlur={() => setHoverRating(0)}
          onClick={() => onChange?.(value)}
          className={
            interactive
              ? "rounded p-0.5 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39ff88]"
              : "cursor-default p-0.5"
          }
        >
          <Star
            size={interactive ? 20 : 13}
            fill={
              value <= displayedRating
                ? "currentColor"
                : "none"
            }
            className={
              value <= displayedRating
                ? "text-[#39ff88]"
                : "text-gray-600"
            }
          />
        </button>
      ))}
    </div>
  );
}

// ======================================================
// DATE FORMAT
// ======================================================

function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ======================================================
// REVIEW CARD
// ======================================================

function TestimonialCard({
  testimonial,
  isOwner,
  onDelete,
}: {
  testimonial: Testimonial;
  isOwner: boolean;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{
        opacity: 0,
        scale: 0.82,
        y: -18,
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      }}
      className="
        group relative flex min-w-0 flex-col
        overflow-hidden rounded-2xl
        border border-white/[0.08]
        bg-[#111113]/80 p-4
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[#39ff88]/30
        hover:bg-[#151518]
        sm:p-5
      "
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#39ff88]/[0.05] blur-2xl" />

      {/* Author */}

      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#39ff88]/20 bg-[#39ff88]/[0.08] text-[#39ff88]">
          <Quote size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-white">
            {testimonial.name}
          </h3>

          <p className="truncate text-xs text-gray-500">
            {testimonial.role}
          </p>
        </div>

        {isOwner && (
          <button
            type="button"
            onClick={() => onDelete(testimonial.id)}
            title="Delete your review"
            aria-label="Delete your review"
            className="
              rounded-lg p-2 text-gray-500
              transition hover:bg-red-500/10
              hover:text-red-400
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-400
            "
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>

      {/* Rating */}

      <div className="relative mt-4 flex items-center justify-between">
        <StarRating rating={testimonial.rating} />

        <span className="text-xs text-gray-500">
          {testimonial.rating}/5
        </span>
      </div>

      {/* Review */}

      <p className="relative mt-4 flex-1 whitespace-pre-wrap break-words text-sm leading-6 text-gray-400">
        {testimonial.text}
      </p>

      {/* Date */}

      <div className="relative mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3">
        <CalendarDays
          size={13}
          className="text-gray-600"
        />

        <span className="text-[11px] text-gray-500">
          {formatReviewDate(testimonial.createdAt)}
        </span>

        {isOwner && (
          <span className="ml-auto rounded-full border border-[#39ff88]/20 bg-[#39ff88]/[0.05] px-2 py-1 text-[10px] text-[#39ff88]">
            Your review
          </span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#39ff88] transition-all duration-300 group-hover:w-full" />
    </motion.article>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function Testimonials() {
  const { isDark } = useTheme();

  const [testimonials, setTestimonials] = useState<
    Testimonial[]
  >([]);

  const [form, setForm] = useState<ReviewForm>(initialForm);

  const [user, setUser] = useState<User | null>(null);

  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error"
  >("success");

  const [visitorUid, setVisitorUid] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let stored = localStorage.getItem("portfolio_visitor_uid");
      if (!stored) {
        stored =
          "anon_" +
          Math.random().toString(36).slice(2, 11) +
          "_" +
          Date.now().toString(36);
        localStorage.setItem("portfolio_visitor_uid", stored);
      }
      setVisitorUid(stored);
    }
  }, []);

  // ====================================================
  // AUTHENTICATION
  // ====================================================

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (!active) return;

        if (currentUser) {
          setUser(currentUser);
          setAuthReady(true);
          return;
        }

        try {
          const credential = await signInAnonymously(auth);

          if (!active) return;

          setUser(credential.user);
        } catch {
          // Anonymous Auth provider not yet enabled in Firebase Console;
          // visitor UID is active as transparent fallback.
        } finally {
          if (active) {
            setAuthReady(true);
          }
        }
      }
    );

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  // ====================================================
  // REAL-TIME FIRESTORE LISTENER
  // ====================================================

  useEffect(() => {
    setLoading(true);

    const reviewsQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const reviews: Testimonial[] = snapshot.docs.map(
          (document) => {
            const data =
              document.data() as FirestoreReview;

            return {
              id: document.id,
              name: data.name,
              role: data.role,
              text: data.text,
              rating: data.rating,
              ownerUid: data.ownerUid,
              createdAt:
                data.createdAt instanceof Timestamp
                  ? data.createdAt.toDate().toISOString()
                  : new Date().toISOString(),
            };
          }
        );

        setTestimonials(reviews);
        setLoading(false);
      },
      (error) => {
        console.warn("Firestore listener notice:", error);

        setMessage(
          "Unable to load reviews. Check your Firestore connection."
        );

        setMessageType("error");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ====================================================
  // SUBMIT REVIEW
  // ====================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");

    let activeUid = user?.uid;

    if (!activeUid) {
      try {
        const credential = await signInAnonymously(auth);
        setUser(credential.user);
        activeUid = credential.user.uid;
      } catch {
        activeUid =
          visitorUid ||
          "anon_" +
            Math.random().toString(36).slice(2, 11) +
            "_" +
            Date.now().toString(36);
      }
    }

    const name = form.name.trim();
    const role = form.role.trim() || "Visitor";
    const text = form.text.trim();

    if (!name || !text || form.rating < 1) {
      setMessage(
        "Enter your name, write a review, and select a rating."
      );

      setMessageType("error");
      return;
    }

    if (name.length > 60) {
      setMessage("Your name must be 60 characters or fewer.");
      setMessageType("error");
      return;
    }

    if (role.length > 80) {
      setMessage("Your role must be 80 characters or fewer.");
      setMessageType("error");
      return;
    }

    if (text.length < 10 || text.length > 500) {
      setMessage(
        "Your review must contain between 10 and 500 characters."
      );

      setMessageType("error");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, COLLECTION_NAME), {
        name,
        role,
        text,
        rating: form.rating,
        ownerUid: activeUid,
        createdAt: serverTimestamp(),
      });

      setForm(initialForm);
      setShowForm(false);
      setShowAll(true);

      setMessage("Your review has been saved successfully!");
      setMessageType("success");
    } catch (error) {
      console.warn("Review publication notice:", error);

      setMessage(
        "Unable to publish your review. Check your Firebase settings."
      );

      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  }

  // ====================================================
  // DELETE OWN REVIEW
  // ====================================================

  function handleDelete(id: string) {
    const activeUid = user?.uid || visitorUid;

    if (!activeUid) {
      setMessage("Authentication is not ready.");
      setMessageType("error");
      return;
    }

    const review = testimonials.find((item) => item.id === id);

    if (!review) {
      setMessage("Review not found.");
      setMessageType("error");
      return;
    }

    if (review.ownerUid !== activeUid) {
      setMessage("You can only delete your own reviews.");
      setMessageType("error");
      return;
    }

    setDeletingId(id);
  }

  async function confirmDelete() {
    if (!deletingId) return;

    const activeUid = user?.uid || visitorUid;

    if (!activeUid) {
      setMessage("Authentication is not ready.");
      setMessageType("error");
      setDeletingId(null);
      return;
    }

    const review = testimonials.find((item) => item.id === deletingId);

    if (!review) {
      setMessage("Review not found.");
      setMessageType("error");
      setDeletingId(null);
      return;
    }

    if (review.ownerUid !== activeUid) {
      setMessage("You can only delete your own reviews.");
      setMessageType("error");
      setDeletingId(null);
      return;
    }

    const targetId = deletingId;
    const backupTestimonials = [...testimonials];

    // 1. Immediately close modal with zero delay
    setDeletingId(null);

    // 2. Optimistically remove review from state with instant exit animation
    setTestimonials((prev) => prev.filter((item) => item.id !== targetId));

    setMessage("Your review has been deleted.");
    setMessageType("success");

    // 3. Background delete in Firestore
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, targetId));
    } catch (error) {
      console.warn("Delete review notice:", error);
      // Revert if network error occurs
      setTestimonials(backupTestimonials);
      setMessage(
        "Unable to delete your review. Please try again."
      );
      setMessageType("error");
    }
  }

  // ====================================================
  // VISIBLE REVIEWS
  // ====================================================

  const visibleReviews = showAll
    ? testimonials
    : testimonials.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMoreReviews =
    testimonials.length > INITIAL_VISIBLE_COUNT;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section
      id="testimonials"
      className="
        relative w-full min-w-0 overflow-hidden
        border-t border-white/[0.05]
        py-12 sm:py-16 lg:py-20
      "
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-px w-7 bg-[#39ff88]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#39ff88]">
                Testimonials
              </p>
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              What people{" "}
              <span className="text-[#39ff88]">say.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Your feedback matters. Share your experience and
              help others discover my work.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowForm((current) => !current);
              setMessage("");
            }}
            className="
              inline-flex shrink-0 items-center justify-center gap-2
              rounded-xl border border-[#39ff88]/30
              bg-[#39ff88]/10 px-4 py-3
              text-xs font-semibold text-[#39ff88]
              transition hover:bg-[#39ff88]/20
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[#39ff88]
            "
          >
            {showForm ? <X size={15} /> : <Plus size={15} />}
            {showForm ? "Close Form" : "Write a Review"}
          </button>
        </div>

        {/* FORM */}

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: -18,
                scale: 0.97,
                transition: { duration: 0.28, ease: "easeInOut" },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="
                mt-8 rounded-2xl
                border border-[#39ff88]/20
                bg-[#111113]/90 p-5 sm:p-7
              "
            >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#39ff88]/10 text-[#39ff88]">
                <MessageSquare size={19} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Write your review
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Tell me about your experience.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">

              {/* NAME AND ROLE */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="review-name"
                    className="mb-2 block text-xs font-medium text-gray-300"
                  >
                    Your name *
                  </label>

                  <input
                    id="review-name"
                    type="text"
                    required
                    maxLength={60}
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Enter your name"
                    className="
                      w-full rounded-xl border border-white/10
                      bg-black/30 px-4 py-3 text-sm text-white
                      outline-none transition
                      placeholder:text-gray-600
                      focus:border-[#39ff88]/50
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="review-role"
                    className="mb-2 block text-xs font-medium text-gray-300"
                  >
                    Your role
                  </label>

                  <input
                    id="review-role"
                    type="text"
                    maxLength={80}
                    value={form.role}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        role: event.target.value,
                      }))
                    }
                    placeholder="Developer, Student, Client..."
                    className="
                      w-full rounded-xl border border-white/10
                      bg-black/30 px-4 py-3 text-sm text-white
                      outline-none transition
                      placeholder:text-gray-600
                      focus:border-[#39ff88]/50
                    "
                  />
                </div>
              </div>

              {/* RATING */}

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-300">
                  Your rating *
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <StarRating
                    rating={form.rating}
                    interactive
                    onChange={(rating) =>
                      setForm((current) => ({
                        ...current,
                        rating,
                      }))
                    }
                  />

                  <span className="text-xs text-gray-500">
                    {form.rating > 0
                      ? `${form.rating} out of 5`
                      : "Select your rating"}
                  </span>
                </div>

                <input
                  type="number"
                  value={form.rating || ""}
                  required
                  min={1}
                  max={5}
                  readOnly
                  aria-label="Selected star rating"
                  className="sr-only"
                />
              </div>

              {/* REVIEW TEXT */}

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="review-text"
                    className="text-xs font-medium text-gray-300"
                  >
                    Your thoughts *
                  </label>

                  <span className="text-[10px] text-gray-600">
                    {form.text.length}/500
                  </span>
                </div>

                <textarea
                  id="review-text"
                  rows={5}
                  required
                  minLength={10}
                  maxLength={500}
                  value={form.text}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      text: event.target.value,
                    }))
                  }
                  placeholder="Share your thoughts about my portfolio, projects, or work..."
                  className="
                    w-full resize-y rounded-xl border border-white/10
                    bg-black/30 px-4 py-3 text-sm leading-6 text-white
                    outline-none transition
                    placeholder:text-gray-600
                    focus:border-[#39ff88]/50
                  "
                />

                <p className="mt-2 text-[10px] text-gray-600">
                  Minimum 10 characters and maximum 500 characters.
                </p>
              </div>

              {/* SUBMIT */}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] leading-5 text-gray-500">
                  Reviews are saved in the online database.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl bg-[#39ff88] px-5 py-3
                    text-xs font-bold text-black transition
                    hover:bg-[#70ffa8]
                    disabled:cursor-not-allowed disabled:opacity-50
                  "
                >
                  <Send size={14} />
                  {submitting ? "Publishing..." : "Publish Review"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATUS */}

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            role="status"
            aria-live="polite"
            className={`mt-5 rounded-xl border p-3 text-xs ${
              messageType === "error"
                ? "border-red-500/20 bg-red-500/5 text-red-300"
                : "border-[#39ff88]/20 bg-[#39ff88]/5 text-[#39ff88]"
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

        {/* REVIEW LIST */}

        <div className="mt-10 flex items-center justify-between gap-3 sm:mt-12">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Community Reviews
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {testimonials.length}{" "}
              {testimonials.length === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>

        {/* CARDS */}

        {loading ? (
          <div className="mt-8 py-12 text-center">
            <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[#39ff88]/20 border-t-[#39ff88]" />

            <p className="mt-4 text-sm text-gray-500">
              Loading reviews...
            </p>
          </div>
        ) : visibleReviews.length > 0 ? (
          <motion.div
            key={showAll ? "all-reviews" : "limited-reviews"}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
              mt-5 grid grid-cols-1 gap-4
              sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            "
          >
            <AnimatePresence mode="popLayout">
              {visibleReviews.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  isOwner={
                    (Boolean(user) && testimonial.ownerUid === user?.uid) ||
                    (Boolean(visitorUid) && testimonial.ownerUid === visitorUid)
                  }
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-[#111113]/50 px-5 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#39ff88]/15 bg-[#39ff88]/[0.06] text-[#39ff88]">
              <MessageSquare size={24} />
            </div>

            <h3 className="mt-5 text-base font-semibold text-white">
              No reviews yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Be the first to share your thoughts and help
              others discover my portfolio.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="
                mt-5 inline-flex items-center gap-2
                rounded-xl bg-[#39ff88] px-4 py-3
                text-xs font-bold text-black transition
                hover:bg-[#70ffa8]
              "
            >
              <Plus size={14} />
              Write the First Review
            </button>
          </div>
        )}

        {/* VIEW MORE */}

        {!loading && hasMoreReviews && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setShowAll((current) => !current)
              }
              aria-expanded={showAll}
              className="
                rounded-xl border border-white/10
                bg-white/[0.03] px-5 py-3
                text-xs font-medium text-gray-300
                transition hover:border-[#39ff88]/30
                hover:text-[#39ff88]
              "
            >
              {showAll
                ? "View Less"
                : `View More (${testimonials.length - INITIAL_VISIBLE_COUNT} more)`}
            </button>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL CARD */}
        <AnimatePresence>
          {deletingId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* BACKDROP */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  if (!isDeleting) setDeletingId(null);
                }}
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
              />

              {/* GLASS CARD */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
                className={`
                  relative w-full max-w-md overflow-hidden rounded-3xl
                  border p-6 sm:p-7 shadow-2xl backdrop-blur-2xl
                  transition-colors duration-300
                  ${
                    isDark
                      ? "border-white/[0.12] bg-[#0c0c0e]/80 shadow-[0_25px_80px_rgba(0,0,0,0.65)]"
                      : "border-black/[0.1] bg-white/85 shadow-[0_25px_70px_rgba(0,0,0,0.14)]"
                  }
                `}
              >
                {/* Ambient glow effects */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-red-500/15 blur-3xl" />
                <div className="pointer-events-none absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-[#39ff88]/10 blur-3xl" />

                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/10 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                    <Trash2 size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-base font-semibold tracking-tight ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Delete this review?
                    </h3>

                    <p
                      className={`mt-1.5 text-xs leading-5 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Are you sure you want to permanently remove your review? This action cannot be undone.
                    </p>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="relative mt-6 flex items-center justify-end gap-3 border-t border-white/[0.08] pt-4">
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => setDeletingId(null)}
                    className="
                      rounded-xl border border-white/10
                      bg-white/[0.04] px-4 py-2.5
                      text-xs font-semibold text-gray-300
                      backdrop-blur-xl transition-all duration-300
                      hover:border-white/20 hover:bg-white/[0.08] hover:text-white
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20
                      disabled:opacity-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={confirmDelete}
                    className="
                      inline-flex items-center gap-2 rounded-xl
                      border border-red-500/30 bg-red-500/10 px-5 py-2.5
                      text-xs font-semibold text-red-400
                      shadow-[0_0_20px_rgba(239,68,68,0.12)]
                      backdrop-blur-xl transition-all duration-300
                      hover:border-red-500/60 hover:bg-red-500/20 hover:text-red-300
                      hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400
                      disabled:cursor-not-allowed disabled:opacity-50
                    "
                  >
                    <Trash2 size={14} />
                    {isDeleting ? "Deleting..." : "Delete Review"}
                  </button>
                </div>

                {/* Signature portfolio bottom neon accent line */}
                <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-red-500/70 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.6)]" />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}