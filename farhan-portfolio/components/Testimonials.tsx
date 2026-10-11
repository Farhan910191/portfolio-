"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Quote,
  Star,
  Send,
  Trash2,
  MessageSquare,
  TrendingUp,
  UserRound,
  CheckCircle2,
  CalendarDays,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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
  ownerToken: string;
  isUserSubmitted: true;
  isHidden?: boolean;
};

type ReviewForm = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

// ======================================================
// CONFIGURATION
// ======================================================

const STORAGE_KEY = "farhan-portfolio-testimonials-v3";
const OWNER_KEY = "farhan-portfolio-review-owner-v1";

const INITIAL_VISIBLE_COUNT = 4;

// ======================================================
// ANIMATIONS
// ======================================================

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// ======================================================
// STAR RATING
// ======================================================

function StarRating({
  rating,
  interactive = false,
  onChange,
  size = 13,
  label = "Rating",
}: {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: number;
  label?: string;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayedRating = hoverRating || rating;

  return (
    <div
      className="flex items-center gap-0.5"
      role={interactive ? "group" : undefined}
      aria-label={`${label}: ${rating} out of 5 stars`}
      onMouseLeave={() => setHoverRating(0)}
    >
      {[1, 2, 3, 4, 5].map((value) => {
        const active = value <= displayedRating;

        if (interactive) {
          return (
            <button
              key={value}
              type="button"
              aria-label={`${value} out of 5 stars`}
              aria-pressed={rating === value}
              onMouseEnter={() => setHoverRating(value)}
              onFocus={() => setHoverRating(value)}
              onBlur={() => setHoverRating(0)}
              onClick={() => onChange?.(value)}
              className="rounded p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39ff88]"
            >
              <Star
                size={size}
                fill={active ? "currentColor" : "none"}
                className={
                  active ? "text-[#39ff88]" : "text-gray-600"
                }
              />
            </button>
          );
        }

        return (
          <Star
            key={value}
            size={size}
            fill={active ? "currentColor" : "none"}
            className={
              active ? "text-[#39ff88]" : "text-gray-700"
            }
          />
        );
      })}
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
  onToggleHidden,
  onDelete,
}: {
  testimonial: Testimonial;
  isOwner: boolean;
  onToggleHidden: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className="
        group relative flex min-w-0 flex-col
        overflow-hidden rounded-xl
        border border-white/[0.08]
        bg-[#111113]/80 p-3
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-[#39ff88]/30
        hover:bg-[#151518]
        sm:p-3.5
      "
    >
      {/* Subtle accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-full bg-[#39ff88]/[0.04] blur-2xl" />

      {/* Author and owner controls */}
      <div className="relative flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#39ff88]/15 bg-[#39ff88]/[0.06] text-[#39ff88]">
          <Quote size={15} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xs font-semibold text-white sm:text-sm">
            {testimonial.name}
          </h3>

          <p className="truncate text-[10px] text-gray-500">
            {testimonial.role}
          </p>
        </div>

        {/* Only the owner sees these controls */}
        {isOwner && (
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => onToggleHidden(testimonial.id)}
              title={
                testimonial.isHidden
                  ? "Show your review"
                  : "Hide your review"
              }
              aria-label={
                testimonial.isHidden
                  ? "Show your review"
                  : "Hide your review"
              }
              className="
                rounded-md p-1.5 text-gray-500
                transition hover:bg-[#39ff88]/10
                hover:text-[#39ff88]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#39ff88]
              "
            >
              {testimonial.isHidden ? (
                <Eye size={14} />
              ) : (
                <EyeOff size={14} />
              )}
            </button>

            <button
              type="button"
              onClick={() => onDelete(testimonial.id)}
              title="Delete your review"
              aria-label="Delete your review"
              className="
                rounded-md p-1.5 text-gray-500
                transition hover:bg-red-500/10
                hover:text-red-400
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-400
              "
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="relative mt-2.5 flex items-center justify-between gap-2">
        <StarRating rating={testimonial.rating} />

        <span className="text-[10px] text-gray-500">
          {testimonial.rating}/5
        </span>
      </div>

      {/* Review */}
      <p className="relative mt-2.5 break-words text-xs leading-5 text-gray-400">
        {testimonial.text}
      </p>

      {/* Date and owner status */}
      <div className="relative mt-3 flex items-center gap-1.5 border-t border-white/[0.06] pt-2.5">
        <CalendarDays
          size={11}
          className="shrink-0 text-gray-600"
        />

        <span className="text-[9px] text-gray-600">
          {formatReviewDate(testimonial.createdAt)}
        </span>

        {isOwner && (
          <span className="ml-auto rounded-full border border-[#39ff88]/15 px-1.5 py-0.5 text-[9px] text-[#39ff88]">
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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [form, setForm] = useState<ReviewForm>({
    name: "",
    role: "",
    text: "",
    rating: 0,
  });

  const [ownerToken, setOwnerToken] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showMyHiddenReviews, setShowMyHiddenReviews] =
    useState(false);

  // ====================================================
  // LOAD REVIEWS AND OWNER ID
  // ====================================================

  useEffect(() => {
    try {
      let token = localStorage.getItem(OWNER_KEY);

      if (!token) {
        token =
          typeof crypto !== "undefined" &&
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        localStorage.setItem(OWNER_KEY, token);
      }

      setOwnerToken(token);

      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          const validReviews: Testimonial[] = parsed.filter(
            (item: unknown): item is Testimonial => {
              if (
                typeof item !== "object" ||
                item === null
              ) {
                return false;
              }

              const review = item as Partial<Testimonial>;

              return (
                typeof review.id === "string" &&
                typeof review.name === "string" &&
                typeof review.role === "string" &&
                typeof review.text === "string" &&
                typeof review.rating === "number" &&
                Number.isInteger(review.rating) &&
                review.rating >= 1 &&
                review.rating <= 5 &&
                typeof review.createdAt === "string" &&
                review.isUserSubmitted === true &&
                typeof review.ownerToken === "string"
              );
            }
          );

          setTestimonials(validReviews);
        }
      }
    } catch {
      setMessage(
        "Unable to load saved reviews. Browser storage may be unavailable."
      );
    } finally {
      setHydrated(true);
    }
  }, []);

  // ====================================================
  // SAVE REVIEWS
  // ====================================================

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(testimonials)
      );
    } catch {
      setMessage("Unable to save reviews in browser storage.");
    }
  }, [testimonials, hydrated]);

  // ====================================================
  // DERIVED DATA
  // ====================================================

  const publicReviews = useMemo(
    () =>
      testimonials.filter(
        (review) =>
          !review.isHidden ||
          (review.ownerToken === ownerToken &&
            showMyHiddenReviews)
      ),
    [testimonials, ownerToken, showMyHiddenReviews]
  );

  const myReviews = useMemo(
    () =>
      testimonials.filter(
        (review) =>
          review.ownerToken === ownerToken &&
          Boolean(ownerToken)
      ),
    [testimonials, ownerToken]
  );

  const myHiddenReviews = myReviews.filter(
    (review) => review.isHidden
  );

  const averageRating = useMemo(() => {
    if (publicReviews.length === 0) return 0;

    return (
      publicReviews.reduce(
        (total, review) => total + review.rating,
        0
      ) / publicReviews.length
    );
  }, [publicReviews]);

  const ratingDistribution = useMemo(
    () =>
      [5, 4, 3, 2, 1].map((rating) => {
        const count = publicReviews.filter(
          (review) => review.rating === rating
        ).length;

        return {
          rating,
          count,
          percentage:
            publicReviews.length > 0
              ? (count / publicReviews.length) * 100
              : 0,
        };
      }),
    [publicReviews]
  );

  const visibleReviews = showAll
    ? publicReviews
    : publicReviews.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMoreReviews =
    publicReviews.length > INITIAL_VISIBLE_COUNT;

  // ====================================================
  // SUBMIT REVIEW
  // ====================================================

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!ownerToken) {
      setMessage("Unable to identify this browser. Refresh and try again.");
      return;
    }

    const name = form.name.trim();
    const role = form.role.trim() || "Visitor";
    const text = form.text.trim();

    if (!name || !text || form.rating < 1) {
      setMessage(
        "Enter your name, write a review, and select a rating."
      );
      return;
    }

    if (name.length > 60) {
      setMessage("Your name must be 60 characters or fewer.");
      return;
    }

    if (role.length > 80) {
      setMessage("Your role must be 80 characters or fewer.");
      return;
    }

    if (text.length < 10 || text.length > 500) {
      setMessage(
        "Your review must contain between 10 and 500 characters."
      );
      return;
    }

    const newReview: Testimonial = {
      id:
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name,
      role,
      text,
      rating: form.rating,
      createdAt: new Date().toISOString(),
      ownerToken,
      isUserSubmitted: true,
      isHidden: false,
    };

    setTestimonials((current) => [
      ...current,
      newReview,
    ]);

    setForm({
      name: "",
      role: "",
      text: "",
      rating: 0,
    });

    setShowForm(false);
    setShowAll(true);
    setShowMyHiddenReviews(false);

    setMessage("Your review was published successfully.");
  }

  // ====================================================
  // TOGGLE OWN REVIEW VISIBILITY
  // ====================================================

  function handleToggleHidden(id: string) {
    const review = testimonials.find(
      (item) => item.id === id
    );

    if (!review || !ownerToken) {
      setMessage("Unable to find your review.");
      return;
    }

    if (review.ownerToken !== ownerToken) {
      setMessage("You can only hide or show your own reviews.");
      return;
    }

    const willHide = !review.isHidden;

    setTestimonials((current) =>
      current.map((item) =>
        item.id === id &&
        item.ownerToken === ownerToken
          ? {
              ...item,
              isHidden: !item.isHidden,
            }
          : item
      )
    );

    setMessage(
      willHide
        ? "Your review is now hidden from the public list."
        : "Your review is now visible."
    );
  }

  // ====================================================
  // DELETE OWN REVIEW
  // ====================================================

  function handleDelete(id: string) {
    const review = testimonials.find(
      (item) => item.id === id
    );

    if (!review || !ownerToken) {
      setMessage("Unable to find your review.");
      return;
    }

    if (review.ownerToken !== ownerToken) {
      setMessage("You can only delete your own reviews.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your review?"
    );

    if (!confirmed) return;

    setTestimonials((current) =>
      current.filter(
        (item) =>
          item.id !== id ||
          item.ownerToken !== ownerToken
      )
    );

    setMessage("Your review was deleted successfully.");
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section
      id="testimonials"
      className="relative w-full min-w-0 overflow-hidden border-t border-white/[0.05] py-8 sm:py-10"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-[#39ff88]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#39ff88]">
                09 — Testimonials
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowForm((current) => !current)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#39ff88]/25 bg-[#39ff88]/10 px-3 py-2 text-[11px] font-semibold text-[#39ff88] transition hover:bg-[#39ff88]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39ff88]"
            >
              <Star size={13} />
              {showForm ? "Close Form" : "Write a Review"}
            </button>
          </div>

          <div className="mt-3">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              What people{" "}
              <span className="text-[#39ff88]">say.</span>
            </h2>

            <p className="mt-1.5 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm">
              Share your experience and help improve my portfolio.
            </p>
          </div>
        </motion.div>

        {/* STATISTICS */}

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-white/[0.08] bg-[#111113]/75 p-3">
            <div className="flex items-center gap-1.5 text-gray-500">
              <TrendingUp size={13} className="text-[#39ff88]" />
              <span className="text-[9px] uppercase tracking-wider">
                Average Rating
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-2xl font-bold text-white">
                {averageRating.toFixed(1)}
              </span>

              <StarRating
                rating={Math.round(averageRating)}
                size={10}
              />
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.08] bg-[#111113]/75 p-3">
            <div className="flex items-center gap-1.5 text-gray-500">
              <MessageSquare size={13} className="text-[#39ff88]" />
              <span className="text-[9px] uppercase tracking-wider">
                Public Reviews
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-white">
              {publicReviews.filter((review) => !review.isHidden).length}
            </p>
          </div>

          <div className="rounded-lg border border-white/[0.08] bg-[#111113]/75 p-3">
            <div className="flex items-center gap-1.5 text-gray-500">
              <UserRound size={13} className="text-[#39ff88]" />
              <span className="text-[9px] uppercase tracking-wider">
                Your Reviews
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-white">
              {myReviews.length}
            </p>

            <p className="mt-1 text-[9px] text-gray-500">
              {myHiddenReviews.length} hidden
            </p>
          </div>
        </div>

        {/* REVIEW FORM */}

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 rounded-lg border border-[#39ff88]/20 bg-[#111113]/90 p-3 sm:p-4"
          >
            <h3 className="text-sm font-bold text-white">
              Write your review
            </h3>

            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="review-name"
                    className="mb-1 block text-[11px] text-gray-300"
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
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white outline-none placeholder:text-gray-600 focus:border-[#39ff88]/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="review-role"
                    className="mb-1 block text-[11px] text-gray-300"
                  >
                    Your role
                  </label>

                  <input
                    id="review-role"
                    type="text"
                    maxLength={80}
                    value={form.role}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        role: event.target.value,
                      })
                    }
                    placeholder="Developer, Student, Client..."
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white outline-none placeholder:text-gray-600 focus:border-[#39ff88]/50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] text-gray-300">
                  Your rating *
                </label>

                <div className="flex items-center gap-2">
                  <StarRating
                    rating={form.rating}
                    interactive
                    onChange={(rating) =>
                      setForm({ ...form, rating })
                    }
                    size={18}
                    label="Choose your rating"
                  />

                  <span className="text-[10px] text-gray-500">
                    {form.rating ? `${form.rating}/5` : "Choose stars"}
                  </span>
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <label
                    htmlFor="review-text"
                    className="text-[11px] text-gray-300"
                  >
                    Your review *
                  </label>

                  <span className="text-[9px] text-gray-600">
                    {form.text.length}/500
                  </span>
                </div>

                <textarea
                  id="review-text"
                  rows={3}
                  required
                  minLength={10}
                  maxLength={500}
                  value={form.text}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      text: event.target.value,
                    })
                  }
                  placeholder="Share your thoughts..."
                  className="w-full resize-y rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs leading-5 text-white outline-none placeholder:text-gray-600 focus:border-[#39ff88]/50"
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[9px] text-gray-600">
                  You can hide or delete your own review.
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#39ff88] px-4 py-2 text-[11px] font-bold text-black transition hover:bg-[#70ffa8]"
                >
                  <Send size={12} />
                  Publish Review
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* OWN HIDDEN REVIEWS */}

        {myHiddenReviews.length > 0 && (
          <div className="mt-4 rounded-lg border border-white/10 bg-[#111113]/75 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-semibold text-white">
                  Your hidden reviews
                </h3>

                <p className="mt-1 text-[10px] text-gray-500">
                  Only reviews belonging to this browser are listed here.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowMyHiddenReviews((current) => !current)
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[10px] text-gray-300 transition hover:border-[#39ff88]/30 hover:text-[#39ff88]"
              >
                {showMyHiddenReviews ? (
                  <>
                    <EyeOff size={12} />
                    Hide My Hidden Reviews
                  </>
                ) : (
                  <>
                    <Eye size={12} />
                    Manage Hidden Reviews
                  </>
                )}
              </button>
            </div>

            {showMyHiddenReviews && (
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {myHiddenReviews.map((review) => (
                  <TestimonialCard
                    key={review.id}
                    testimonial={review}
                    isOwner={true}
                    onToggleHidden={handleToggleHidden}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* STATUS MESSAGE */}

        {message && (
          <div
            role="status"
            aria-live="polite"
            className="mt-3 flex items-start gap-2 rounded-lg border border-[#39ff88]/15 bg-[#39ff88]/[0.04] p-2.5 text-[11px] leading-5 text-gray-300"
          >
            <CheckCircle2
              size={13}
              className="mt-0.5 shrink-0 text-[#39ff88]"
            />
            <p>{message}</p>
          </div>
        )}

        {/* RATING BREAKDOWN */}

        <div className="mt-3 rounded-lg border border-white/[0.08] bg-[#111113]/75 p-3">
          <h3 className="mb-3 text-[11px] font-semibold text-white">
            Rating Breakdown
          </h3>

          <div className="grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
            {ratingDistribution.map((item) => (
              <div
                key={item.rating}
                className="flex items-center gap-2"
              >
                <span className="flex w-7 items-center gap-1 text-[9px] text-gray-400">
                  {item.rating}
                  <Star
                    size={9}
                    fill="currentColor"
                    className="text-[#39ff88]"
                  />
                </span>

                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${item.percentage}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-[#39ff88]"
                  />
                </div>

                <span className="w-4 text-right text-[9px] text-gray-500">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PUBLIC REVIEW CARDS */}

        {publicReviews.filter((review) => !review.isHidden).length > 0 ? (
          <>
            <motion.div
              key={showAll ? "all-reviews" : "limited-reviews"}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {visibleReviews
                .filter((review) => !review.isHidden)
                .map((review) => (
                  <TestimonialCard
                    key={review.id}
                    testimonial={review}
                    isOwner={review.ownerToken === ownerToken}
                    onToggleHidden={handleToggleHidden}
                    onDelete={handleDelete}
                  />
                ))}
            </motion.div>

            {hasMoreReviews && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((current) => !current)}
                  aria-expanded={showAll}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-medium text-gray-300 transition hover:border-[#39ff88]/30 hover:text-[#39ff88]"
                >
                  {showAll ? (
                    <>
                      <ChevronUp size={14} />
                      View Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} />
                      View More (
                      {
                        publicReviews.filter(
                          (review) => !review.isHidden
                        ).length - INITIAL_VISIBLE_COUNT
                      }{" "}
                      more)
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-4 rounded-lg border border-dashed border-white/10 bg-[#111113]/50 px-4 py-8 text-center">
            <MessageSquare
              size={22}
              className="mx-auto text-[#39ff88]"
            />

            <h3 className="mt-3 text-xs font-semibold text-white">
              No public reviews yet
            </h3>

            <p className="mt-1 text-[10px] text-gray-500">
              Be the first to share your experience.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-3 rounded-lg bg-[#39ff88] px-3 py-2 text-[10px] font-semibold text-black transition hover:bg-[#70ffa8]"
            >
              Write a Review
            </button>
          </div>
        )}

        {/* FOOTER */}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-center font-mono text-[9px] text-gray-600">
          <span className="text-[#39ff88]/50">
            {"<testimonials />"}
          </span>

          <span>Learn • Build • Collaborate</span>

          <span className="text-[#39ff88]/50">
            {"</>"}
          </span>
        </div>
      </div>
    </section>
  );
}