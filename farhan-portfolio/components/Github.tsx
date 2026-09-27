"use client";

import {
  Activity,
  ExternalLink,
  GitBranch,
  RefreshCw,
  Star,
  Users,
  GitFork,
  Code2,
  CalendarDays,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

// ======================================================
// CONFIG
// ======================================================

const GITHUB_USERNAME = "Farhan910191";

// 30 minutes instead of 5 minutes.
// This helps avoid GitHub API rate limits.
const REFRESH_TIME = 30 * 60 * 1000;

// ======================================================
// TYPES
// ======================================================

interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;

  public_repos: number;
  followers: number;
  following: number;

  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;

  stargazers_count: number;
  forks_count: number;

  language: string | null;

  updated_at: string;
  pushed_at: string;
  created_at: string;

  default_branch: string;
  private: boolean;
  fork: boolean;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;

  repo: {
    name: string;
  };

  payload?: {
    commits?: {
      sha: string;
      message: string;
    }[];
  };
}

interface ActivityDay {
  date: string;
  count: number;
}

// ======================================================
// ANIMATION
// ======================================================

const headerVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.97,
    filter: "blur(5px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ======================================================
// COMPONENT
// ======================================================

export default function Github() {
  const [profile, setProfile] =
    useState<GitHubProfile | null>(null);

  const [repos, setRepos] =
    useState<GitHubRepo[]>([]);

  const [events, setEvents] =
    useState<GitHubEvent[]>([]);

  const [activity, setActivity] =
    useState<ActivityDay[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [lastUpdated, setLastUpdated] =
    useState<Date | null>(null);

  const [rateLimitMessage, setRateLimitMessage] =
    useState("");

  // ====================================================
  // FETCH GITHUB DATA
  // ====================================================

  const fetchGitHubData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setRateLimitMessage("");

      // ==================================================
      // PROFILE
      // ==================================================

      const profileResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(
          GITHUB_USERNAME
        )}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
        }
      );

      // ==================================================
      // RATE LIMIT HANDLING
      // ==================================================

      if (profileResponse.status === 403) {
        const resetHeader =
          profileResponse.headers.get(
            "x-ratelimit-reset"
          );

        let resetMessage =
          "GitHub API rate limit reached.";

        if (resetHeader) {
          const resetTime =
            Number(resetHeader) * 1000;

          const resetDate =
            new Date(resetTime);

          resetMessage =
            `GitHub API rate limit reached. Try again after ${resetDate.toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}.`;
        }

        setRateLimitMessage(resetMessage);

        // Do NOT throw an error.
        // Keep the portfolio running.
        setLoading(false);

        return;
      }

      if (!profileResponse.ok) {
        const details =
          await profileResponse
            .json()
            .catch(() => null);

        throw new Error(
          details?.message ||
            `GitHub profile could not be loaded (${profileResponse.status}).`
        );
      }

      const profileData: GitHubProfile =
        await profileResponse.json();

      // ==================================================
      // REPOSITORIES
      // ==================================================

      const reposResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(
          GITHUB_USERNAME
        )}/repos?per_page=100&sort=updated&direction=desc`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
        }
      );

      let reposData: GitHubRepo[] = [];

      if (reposResponse.status === 403) {
        setRateLimitMessage(
          "GitHub API rate limit reached while loading repositories."
        );
      } else if (reposResponse.ok) {
        reposData =
          await reposResponse.json();
      }

      // ==================================================
      // PUBLIC EVENTS
      // ==================================================

      const eventsResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(
          GITHUB_USERNAME
        )}/events/public?per_page=100`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
        }
      );

      let eventsData: GitHubEvent[] = [];

      if (
        eventsResponse.ok
      ) {
        eventsData =
          await eventsResponse.json();
      }

      // ==================================================
      // ACTIVITY
      // ==================================================

      const activityMap: Record<
        string,
        number
      > = {};

      const today = new Date();

      for (let i = 0; i < 365; i++) {
        const date = new Date(today);

        date.setDate(
          today.getDate() - i
        );

        const dateString =
          date.toISOString().split("T")[0];

        activityMap[dateString] = 0;
      }

      eventsData.forEach((event) => {
        if (!event.created_at) {
          return;
        }

        const date =
          event.created_at.split("T")[0];

        if (
          activityMap[date] !== undefined
        ) {
          let count = 1;

          if (
            event.type === "PushEvent" &&
            event.payload?.commits
          ) {
            count = Math.max(
              event.payload.commits.length,
              1
            );
          }

          activityMap[date] += count;
        }
      });

      const activityData =
        Object.entries(activityMap)
          .map(([date, count]) => ({
            date,
            count,
          }))
          .sort((a, b) =>
            a.date.localeCompare(b.date)
          );

      // ==================================================
      // UPDATE STATE
      // ==================================================

      setProfile(profileData);

      setRepos(
        reposData
          .filter(
            (repo) => !repo.private
          )
          .sort(
            (a, b) =>
              new Date(
                b.pushed_at
              ).getTime() -
              new Date(
                a.pushed_at
              ).getTime()
          )
      );

      setEvents(eventsData);

      setActivity(activityData);

      setLastUpdated(new Date());

    } catch (err) {
      console.error(
        "GitHub API Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load GitHub data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ====================================================
  // INITIAL FETCH
  // ====================================================

  useEffect(() => {
    fetchGitHubData();

    const interval = setInterval(
      fetchGitHubData,
      REFRESH_TIME
    );

    return () => {
      clearInterval(interval);
    };
  }, [fetchGitHubData]);

  // ====================================================
  // TOTAL STARS
  // ====================================================

  const totalStars = useMemo(() => {
    return repos.reduce(
      (total, repo) =>
        total + repo.stargazers_count,
      0
    );
  }, [repos]);

  // ====================================================
  // TOTAL FORKS
  // ====================================================

  const totalForks = useMemo(() => {
    return repos.reduce(
      (total, repo) =>
        total + repo.forks_count,
      0
    );
  }, [repos]);

  // ====================================================
  // LANGUAGES
  // ====================================================

  const languages = useMemo(() => {
    const languageMap: Record<
      string,
      number
    > = {};

    repos.forEach((repo) => {
      if (repo.language) {
        languageMap[repo.language] =
          (languageMap[repo.language] || 0) +
          1;
      }
    });

    return Object.entries(languageMap).sort(
      (a, b) => b[1] - a[1]
    );
  }, [repos]);

  // ====================================================
  // ACTIVITY COLORS
  // ====================================================

  const getActivityClass = (
    count: number
  ) => {
    if (count === 0) {
      return "bg-white/[0.05]";
    }

    if (count === 1) {
      return "bg-[#39ff88]/20";
    }

    if (count <= 3) {
      return "bg-[#39ff88]/40";
    }

    if (count <= 6) {
      return "bg-[#39ff88]/60";
    }

    return "bg-[#39ff88]/90";
  };

  // ====================================================
  // FORMAT DATE
  // ====================================================

  const formatDate = (
    date: string
  ) => {
    return new Date(
      date
    ).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // ====================================================
  // STATS
  // ====================================================

  const stats = [
    {
      icon: BookOpen,
      label: "Repositories",
      value:
        profile?.public_repos ?? 0,
    },
    {
      icon: Star,
      label: "Stars",
      value: totalStars,
    },
    {
      icon: Users,
      label: "Followers",
      value:
        profile?.followers ?? 0,
    },
    {
      icon: Users,
      label: "Following",
      value:
        profile?.following ?? 0,
    },
    {
      icon: GitFork,
      label: "Total Forks",
      value: totalForks,
    },
  ];

  // ====================================================
  // LOADING
  // ====================================================

  if (loading && !profile) {
    return (
      <section
        id="github"
        className="border-t border-white/[0.05] py-28 sm:py-36"
      >
        <div className="container-custom">
          <div
            className="
              rounded-3xl
              border
              border-white/[0.08]
              bg-[#111113]/65
              p-12
              text-center
              backdrop-blur-xl
            "
          >
            <RefreshCw
              size={32}
              className="mx-auto animate-spin text-[#39ff88]"
            />

            <p className="mt-5 text-gray-500">
              Loading GitHub data...
            </p>

            <p className="mt-2 font-mono text-xs text-gray-700">
              github.connect()
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ====================================================
  // MAIN
  // ====================================================

  return (
    <section
      id="github"
      className="relative border-t border-white/[0.05] py-28 sm:py-36"
    >
      <div className="container-custom">

        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
          }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#39ff88]" />

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
              08 — GitHub
            </p>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>
              <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Code in{" "}
                <span className="text-[#39ff88]">
                  public.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl leading-8 text-gray-500">
                Explore my GitHub profile, repositories,
                technologies and public development activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              {/* REFRESH */}
              <button
                type="button"
                onClick={fetchGitHubData}
                disabled={loading}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-[#111113]/60
                  px-5
                  py-3
                  text-sm
                  text-gray-400
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-[#39ff88]/30
                  hover:bg-[#39ff88]/5
                  hover:text-[#39ff88]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <RefreshCw
                  size={16}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh
              </button>

              {/* GITHUB PROFILE */}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#39ff88]/30
                  bg-[#39ff88]/5
                  px-5
                  py-3
                  text-sm
                  text-[#39ff88]
                  transition-all
                  duration-300
                  hover:bg-[#39ff88]
                  hover:text-black
                  hover:shadow-[0_0_25px_rgba(57,255,136,0.15)]
                "
              >
                <FaGithub size={16} />

                GitHub Profile

                <ExternalLink size={16} />
              </a>

            </div>
          </div>
        </motion.div>

        {/* ==================================================
            RATE LIMIT MESSAGE
        ================================================== */}

        {rateLimitMessage && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mt-8
              rounded-2xl
              border
              border-yellow-500/20
              bg-yellow-500/5
              p-5
              text-sm
              text-yellow-400
            "
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5">⚠️</span>

              <div>
                <p className="font-semibold">
                  GitHub API limit
                </p>

                <p className="mt-1 text-yellow-400/70">
                  {rateLimitMessage}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================
            MAIN GLASS CONTAINER
        ================================================== */}

        <div
          className="
            relative
            mt-14
            overflow-hidden
            rounded-[32px]
            border
            border-white/[0.08]
            bg-[#111113]/55
            backdrop-blur-xl
          "
        >

          {/* STATIC GLOW */}
          <div
            className="
              pointer-events-none
              absolute
              -right-40
              -top-40
              h-[500px]
              w-[500px]
              rounded-full
              bg-[#39ff88]/[0.035]
              blur-[120px]
            "
          />

          <div className="relative p-6 sm:p-8 lg:p-12">

            {/* ==================================================
                PROFILE
            ================================================== */}

            {profile && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.2,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/[0.07]
                    bg-black/25
                    p-6
                    backdrop-blur-md
                    transition-all
                    duration-500
                    hover:border-[#39ff88]/25
                  "
                >

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-40
                      w-40
                      rounded-full
                      bg-[#39ff88]/[0.04]
                      blur-[60px]
                    "
                  />

                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-5">

                      {/* STATIC IMAGE */}
                      <img
                        src={profile.avatar_url}
                        alt={
                          profile.name ||
                          profile.login
                        }
                        className="
                          h-20
                          w-20
                          rounded-2xl
                          border-2
                          border-[#39ff88]/20
                          object-cover
                          transition-all
                          duration-300
                          group-hover:border-[#39ff88]/50
                        "
                      />

                      <div>

                        <h3 className="text-xl font-bold text-white">
                          {profile.name ||
                            profile.login}
                        </h3>

                        <p className="mt-1 font-mono text-sm text-[#39ff88]">
                          @{profile.login}
                        </p>

                        {profile.bio && (
                          <p className="mt-2 max-w-xl text-sm text-gray-600">
                            {profile.bio}
                          </p>
                        )}

                        {profile.location && (
                          <p className="mt-2 text-xs text-gray-700">
                            📍 {profile.location}
                          </p>
                        )}

                      </div>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        self-start
                        rounded-full
                        border
                        border-[#39ff88]/10
                        bg-[#39ff88]/5
                        px-3
                        py-1.5
                        text-xs
                        text-gray-500
                        sm:self-center
                      "
                    >
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#39ff88]" />

                      Live GitHub data
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ==================================================
                STATS
            ================================================== */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.15,
              }}
              className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
            >

              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    variants={cardVariants}
                  >
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.015,
                      }}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-black/25
                        p-5
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:border-[#39ff88]/30
                      "
                    >

                      <Icon
                        size={19}
                        className="
                          text-[#39ff88]
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      />

                      <p className="mt-5 text-2xl font-bold text-white">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-xs text-gray-600">
                        {stat.label}
                      </p>

                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-px
                          w-0
                          bg-[#39ff88]
                          transition-all
                          duration-500
                          group-hover:w-full
                        "
                      />

                    </motion.div>
                  </motion.div>
                );
              })}

            </motion.div>

            {/* ==================================================
                TECHNOLOGIES
            ================================================== */}

            {languages.length > 0 && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.15,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    mt-5
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-black/25
                    p-6
                    backdrop-blur-md
                  "
                >

                  <div className="flex items-center gap-3">

                    <Code2
                      size={18}
                      className="text-[#39ff88]"
                    />

                    <h3 className="font-semibold text-white">
                      Technologies
                    </h3>

                    <span className="font-mono text-[10px] text-gray-700">
                      detected
                    </span>

                  </div>

                  <div className="mt-5 flex flex-wrap gap-2.5">

                    {languages.map(
                      ([language, count]) => (
                        <span
                          key={language}
                          className="
                            cursor-default
                            rounded-full
                            border
                            border-white/[0.08]
                            bg-white/[0.03]
                            px-4
                            py-2
                            text-sm
                            text-gray-400
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-[#39ff88]/40
                            hover:bg-[#39ff88]/10
                            hover:text-[#39ff88]
                          "
                        >
                          <span className="text-white">
                            {language}
                          </span>

                          <span className="ml-2 text-gray-700">
                            {count}{" "}
                            {count === 1
                              ? "repo"
                              : "repos"}
                          </span>
                        </span>
                      )
                    )}

                  </div>

                </motion.div>
              </motion.div>
            )}

            {/* ==================================================
                ACTIVITY
            ================================================== */}

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.15,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  mt-5
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-black/25
                  p-6
                  backdrop-blur-md
                "
              >

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                  <div>

                    <div className="flex items-center gap-3">

                      <Activity
                        size={18}
                        className="text-[#39ff88]"
                      />

                      <h3 className="font-semibold text-white">
                        GitHub Activity
                      </h3>

                    </div>

                    <p className="mt-1 text-xs text-gray-600">
                      Recent public GitHub events
                    </p>

                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <CalendarDays size={14} />

                    Activity calendar
                  </div>

                </div>

                {/* GRID */}

                <div className="mt-7 overflow-x-auto pb-2">

                  <div className="flex min-w-[780px] gap-1">

                    {Array.from({
                      length: 53,
                    }).map(
                      (_, column) => {

                        const start =
                          column * 7;

                        const week =
                          activity.slice(
                            start,
                            start + 7
                          );

                        return (
                          <div
                            key={column}
                            className="flex flex-col gap-1"
                          >

                            {Array.from({
                              length: 7,
                            }).map(
                              (_, row) => {

                                const day =
                                  week[row];

                                return (
                                  <div
                                    key={row}
                                    title={
                                      day
                                        ? `${day.count} public activities on ${day.date}`
                                        : ""
                                    }
                                    className={`
                                      h-3
                                      w-3
                                      rounded-[3px]
                                      transition-transform
                                      duration-200
                                      hover:scale-125
                                      ${
                                        day
                                          ? getActivityClass(
                                              day.count
                                            )
                                          : "bg-white/[0.05]"
                                      }
                                    `}
                                  />
                                );
                              }
                            )}

                          </div>
                        );
                      }
                    )}

                  </div>
                </div>

                {/* LEGEND */}

                <div className="mt-5 flex items-center justify-end gap-2 text-xs text-gray-700">

                  <span>
                    Less
                  </span>

                  <span className="h-3 w-3 rounded-[3px] bg-white/[0.05]" />

                  <span className="h-3 w-3 rounded-[3px] bg-[#39ff88]/20" />

                  <span className="h-3 w-3 rounded-[3px] bg-[#39ff88]/40" />

                  <span className="h-3 w-3 rounded-[3px] bg-[#39ff88]/60" />

                  <span className="h-3 w-3 rounded-[3px] bg-[#39ff88]/90" />

                  <span>
                    More
                  </span>

                </div>

              </motion.div>
            </motion.div>

            {/* ==================================================
                REPOSITORIES
            ================================================== */}

            <motion.div
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.15,
              }}
              className="mt-10"
            >

              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div>

                  <h3 className="flex items-center gap-2 font-semibold text-white">

                    <GitBranch
                      size={18}
                      className="text-[#39ff88]"
                    />

                    All Repositories

                  </h3>

                  <p className="mt-1 text-xs text-gray-600">
                    {repos.length} public repositories
                  </p>

                </div>

                <a
                  href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-1
                    text-xs
                    text-[#39ff88]
                    transition-colors
                    hover:text-white
                  "
                >
                  View on GitHub

                  <ArrowUpRight size={14} />
                </a>

              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.1,
                }}
                className="grid gap-4 md:grid-cols-2"
              >

                {repos.map((repo) => (
                  <motion.div
                    key={repo.id}
                    variants={cardVariants}
                  >
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.01,
                      }}
                      className="
                        group
                        relative
                        block
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-black/25
                        p-6
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:border-[#39ff88]/30
                      "
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <h4 className="truncate text-base font-semibold text-white transition-colors group-hover:text-[#39ff88]">
                            {repo.name}
                          </h4>

                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                            {repo.description ||
                              "No description available."}
                          </p>

                        </div>

                        <ExternalLink
                          size={16}
                          className="
                            shrink-0
                            text-gray-700
                            transition-all
                            duration-300
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                            group-hover:text-[#39ff88]
                          "
                        />

                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-600">

                        {repo.language && (
                          <span
                            className="
                              rounded-full
                              border
                              border-white/[0.06]
                              bg-white/[0.03]
                              px-3
                              py-1
                            "
                          >
                            {repo.language}
                          </span>
                        )}

                        <span className="flex items-center gap-1">
                          <Star size={13} />
                          {repo.stargazers_count}
                        </span>

                        <span className="flex items-center gap-1">
                          <GitFork size={13} />
                          {repo.forks_count}
                        </span>

                        <span className="ml-auto">
                          Updated{" "}
                          {formatDate(
                            repo.pushed_at
                          )}
                        </span>

                      </div>

                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-px
                          w-0
                          bg-[#39ff88]
                          shadow-[0_0_15px_rgba(57,255,136,0.6)]
                          transition-all
                          duration-500
                          group-hover:w-full
                        "
                      />

                    </motion.a>
                  </motion.div>
                ))}

              </motion.div>
            </motion.div>

            {/* ==================================================
                LAST UPDATED
            ================================================== */}

            <div
              className="
                mt-10
                flex
                flex-col
                justify-between
                gap-3
                border-t
                border-white/[0.06]
                pt-6
                sm:flex-row
                sm:items-center
              "
            >

              <div className="flex items-center gap-2 text-xs text-gray-700">

                <span className="h-2 w-2 animate-pulse rounded-full bg-[#39ff88]" />

                Live GitHub data

              </div>

              {lastUpdated && (
                <p className="font-mono text-xs text-gray-700">
                  Last updated:{" "}
                  {lastUpdated.toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }
                  )}
                </p>
              )}

            </div>

            {/* ==================================================
                NORMAL ERROR
            ================================================== */}

            {error && (
              <div
                className="
                  mt-6
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/5
                  p-4
                  text-sm
                  text-red-400
                "
              >
                {error}
              </div>
            )}

          </div>
        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.5,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mt-10
            flex
            items-center
            justify-center
            gap-3
            font-mono
            text-xs
            text-gray-600
          "
        >
          <span className="text-[#39ff88]/50">
            {"<github />"}
          </span>

          <span>
            Code • Commit • Improve
          </span>

          <span className="text-[#39ff88]/50">
            {"</>"}
          </span>
        </motion.div>

      </div>
    </section>
  );
}