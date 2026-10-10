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
import { motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

// ======================================================
// CONFIG
// ======================================================

const GITHUB_USERNAME = "Farhan910191";
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
// 60 FPS HARDWARE-ACCELERATED ANIMATION VARIANTS
// ======================================================

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ======================================================
// COMPONENT
// ======================================================

export default function Github() {
  const { isDark } = useTheme();

  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [activity, setActivity] = useState<ActivityDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [rateLimitMessage, setRateLimitMessage] = useState("");

  // ====================================================
  // FETCH GITHUB DATA
  // ====================================================

  const fetchGitHubData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setRateLimitMessage("");

      const profileResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
        }
      );

      if (profileResponse.status === 403) {
        const resetHeader = profileResponse.headers.get("x-ratelimit-reset");
        let resetMessage = "GitHub API rate limit reached.";

        if (resetHeader) {
          const resetTime = Number(resetHeader) * 1000;
          const resetDate = new Date(resetTime);
          resetMessage = `GitHub API rate limit reached. Try again after ${resetDate.toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}.`;
        }

        setRateLimitMessage(resetMessage);
        setLoading(false);
        return;
      }

      if (!profileResponse.ok) {
        const details = await profileResponse.json().catch(() => null);
        throw new Error(
          details?.message ||
          `GitHub profile could not be loaded (${profileResponse.status}).`
        );
      }

      const profileData: GitHubProfile = await profileResponse.json();

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
        reposData = await reposResponse.json();
      }

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
      if (eventsResponse.ok) {
        eventsData = await eventsResponse.json();
      }

      // Activity map
      const activityMap: Record<string, number> = {};
      const today = new Date();

      for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split("T")[0];
        activityMap[dateString] = 0;
      }

      eventsData.forEach((event) => {
        if (!event.created_at) return;
        const date = event.created_at.split("T")[0];
        if (activityMap[date] !== undefined) {
          let count = 1;
          if (event.type === "PushEvent" && event.payload?.commits) {
            count = Math.max(event.payload.commits.length, 1);
          }
          activityMap[date] += count;
        }
      });

      const activityData = Object.entries(activityMap)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      setProfile(profileData);
      setRepos(
        reposData
          .filter((repo) => !repo.private)
          .sort(
            (a, b) =>
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          )
      );
      setEvents(eventsData);
      setActivity(activityData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("GitHub API Error:", err);
      setError(
        err instanceof Error ? err.message : "Unable to load GitHub data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubData();
    const interval = setInterval(fetchGitHubData, REFRESH_TIME);
    return () => clearInterval(interval);
  }, [fetchGitHubData]);

  const totalStars = useMemo(() => {
    return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
  }, [repos]);

  const totalForks = useMemo(() => {
    return repos.reduce((total, repo) => total + repo.forks_count, 0);
  }, [repos]);

  const languages = useMemo(() => {
    const languageMap: Record<string, number> = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
      }
    });
    return Object.entries(languageMap).sort((a, b) => b[1] - a[1]);
  }, [repos]);

  const getActivityClass = (count: number) => {
    if (count === 0) {
      return isDark ? "bg-white/[0.05]" : "bg-black/[0.06]";
    }
    if (count === 1) {
      return isDark ? "bg-[#39ff88]/20" : "bg-[#10b981]/25";
    }
    if (count <= 3) {
      return isDark ? "bg-[#39ff88]/40" : "bg-[#10b981]/50";
    }
    if (count <= 6) {
      return isDark ? "bg-[#39ff88]/60" : "bg-[#10b981]/75";
    }
    return isDark ? "bg-[#39ff88]/90" : "bg-[#10b981]";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stats = [
    {
      icon: BookOpen,
      label: "Repositories",
      value: profile?.public_repos ?? 0,
    },
    {
      icon: Star,
      label: "Stars",
      value: totalStars,
    },
    {
      icon: Users,
      label: "Followers",
      value: profile?.followers ?? 0,
    },
    {
      icon: Users,
      label: "Following",
      value: profile?.following ?? 0,
    },
    {
      icon: GitFork,
      label: "Total Forks",
      value: totalForks,
    },
  ];

  // Loading skeleton
  if (loading && !profile) {
    return (
      <section
        id="github"
        className={`border-t py-28 sm:py-36 ${isDark ? "border-white/[0.05]" : "border-black/[0.05]"
          }`}
      >
        <div className="container-custom">
          <div
            className={`
              rounded-3xl
              border
              p-12
              text-center
              backdrop-blur-xl
              ${isDark
                ? "border-white/[0.08] bg-[#121216]/40 text-gray-400"
                : "border-black/[0.07] bg-white/65 text-slate-600 shadow-sm"
              }
            `}
          >
            <RefreshCw
              size={32}
              className={`mx-auto animate-spin ${isDark ? "text-[#39ff88]" : "text-[#10b981]"
                }`}
            />
            <p className="mt-5 text-sm">Loading GitHub activity...</p>
            <p className="mt-2 font-mono text-xs opacity-60">github.connect()</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="github"
      className={`relative border-t py-28 sm:py-36 ${isDark ? "border-white/[0.05]" : "border-black/[0.05]"
        }`}
    >
      <div className="container-custom">
        {/* ==================================================
            HEADER
        ================================================== */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="flex items-center gap-3">
            <span
              className={`h-px w-8 ${isDark ? "bg-[#39ff88]" : "bg-[#10b981]"}`}
            />
            <p
              className={`text-sm font-semibold uppercase tracking-[0.3em] ${isDark ? "text-[#39ff88]" : "text-[#10b981]"
                }`}
            >
              08 — GitHub
            </p>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2
                className={`text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl ${isDark ? "text-white" : "text-slate-900"
                  }`}
              >
                Code in{" "}
                <span className={isDark ? "text-[#39ff88]" : "text-[#10b981]"}>
                  public.
                </span>
              </h2>

              <p
                className={`mt-5 max-w-2xl leading-8 ${isDark ? "text-gray-400" : "text-slate-600"
                  }`}
              >
                Explore my GitHub profile, repositories, technologies and public
                development activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* REFRESH */}
              <button
                type="button"
                onClick={fetchGitHubData}
                disabled={loading}
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-5
                  py-3
                  text-sm
                  backdrop-blur-md
                  transition-all
                  duration-300
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  ${isDark
                    ? "border-white/[0.08] bg-[#121216]/50 text-gray-300 hover:border-[#39ff88]/30 hover:bg-[#39ff88]/10 hover:text-[#39ff88]"
                    : "border-black/[0.08] bg-white/70 text-slate-700 hover:border-[#10b981]/30 hover:bg-[#10b981]/10 hover:text-[#10b981]"
                  }
                `}
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>

              {/* GITHUB PROFILE LINK */}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-5
                  py-3
                  text-sm
                  transition-all
                  duration-300
                  ${isDark
                    ? "border-[#39ff88]/30 bg-[#39ff88]/10 text-[#39ff88] hover:bg-[#39ff88] hover:text-black hover:shadow-[0_0_25px_rgba(57,255,136,0.25)]"
                    : "border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981] hover:text-white hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]"
                  }
                `}
              >
                <FaGithub size={16} />
                GitHub Profile
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Rate limit message */}
        {rateLimitMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 text-sm text-amber-500"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5">⚠️</span>
              <div>
                <p className="font-semibold">GitHub API limit notice</p>
                <p className="mt-1 opacity-80">{rateLimitMessage}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================
            MAIN MINIMAL TRANSPARENT CONTAINER
        ================================================== */}
        <div
          className={`
            relative
            mt-14
            overflow-hidden
            rounded-[32px]
            border
            backdrop-blur-xl
            transition-all
            duration-400
            ${isDark
              ? "border-white/[0.08] bg-[#121216]/35 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              : "border-black/[0.07] bg-white/55 shadow-[0_15px_45px_rgba(0,0,0,0.04)]"
            }
          `}
          style={{ transform: "translateZ(0)" }}
        >
          {/* Ambient glow */}
          <div
            className={`
              pointer-events-none
              absolute
              -right-40
              -top-40
              h-[400px]
              w-[400px]
              rounded-full
              blur-[80px]
              ${isDark ? "bg-[#39ff88]/[0.03]" : "bg-[#10b981]/[0.03]"}
            `}
          />

          <div className="relative p-6 sm:p-8 lg:p-12">
            {/* ==================================================
                PROFILE CARD
            ================================================== */}
            {profile && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  p-6
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  ${isDark
                    ? "border-white/[0.07] bg-white/[0.03] hover:border-[#39ff88]/25 hover:bg-white/[0.05]"
                    : "border-black/[0.06] bg-white/70 hover:border-[#10b981]/25 hover:bg-white/90 shadow-sm"
                  }
                `}
              >
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-5">
                    <img
                      src={profile.avatar_url}
                      alt={profile.name || profile.login}
                      className={`
                        h-20
                        w-20
                        rounded-2xl
                        border-2
                        object-cover
                        transition-all
                        duration-300
                        ${isDark
                          ? "border-[#39ff88]/25 group-hover:border-[#39ff88]/50"
                          : "border-[#10b981]/25 group-hover:border-[#10b981]/50"
                        }
                      `}
                    />

                    <div>
                      <h3
                        className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"
                          }`}
                      >
                        {profile.name || profile.login}
                      </h3>

                      <p
                        className={`mt-1 font-mono text-sm ${isDark ? "text-[#39ff88]" : "text-[#10b981]"
                          }`}
                      >
                        @{profile.login}
                      </p>

                      {profile.bio && (
                        <p
                          className={`mt-2 max-w-xl text-sm ${isDark ? "text-gray-400" : "text-slate-600"
                            }`}
                        >
                          {profile.bio}
                        </p>
                      )}

                      {profile.location && (
                        <p
                          className={`mt-2 text-xs ${isDark ? "text-gray-500" : "text-slate-500"
                            }`}
                        >
                          📍 {profile.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`
                      flex
                      items-center
                      gap-2
                      self-start
                      rounded-full
                      border
                      px-3.5
                      py-1.5
                      text-xs
                      sm:self-center
                      ${isDark
                        ? "border-[#39ff88]/15 bg-[#39ff88]/5 text-gray-400"
                        : "border-[#10b981]/20 bg-[#10b981]/5 text-slate-600"
                      }
                    `}
                  >
                    <span
                      className={`h-2 w-2 animate-pulse rounded-full ${isDark ? "bg-[#39ff88]" : "bg-[#10b981]"
                        }`}
                    />
                    Live GitHub profile
                  </div>
                </div>
              </motion.div>
            )}

            {/* ==================================================
                STATS CARDS (MINIMAL TRANSPARENT CARDS)
            ================================================== */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={cardVariants}
                    className={`
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      p-5
                      backdrop-blur-md
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      ${isDark
                        ? "border-white/[0.07] bg-white/[0.03] hover:border-[#39ff88]/30 hover:bg-white/[0.05]"
                        : "border-black/[0.06] bg-white/70 hover:border-[#10b981]/30 hover:bg-white/90 shadow-sm"
                      }
                    `}
                  >
                    <Icon
                      size={20}
                      className={`transition-transform duration-300 group-hover:scale-110 ${isDark ? "text-[#39ff88]" : "text-[#10b981]"
                        }`}
                    />

                    <p
                      className={`mt-4 text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"
                        }`}
                    >
                      {stat.value}
                    </p>

                    <p
                      className={`mt-1 text-xs ${isDark ? "text-gray-400" : "text-slate-500"
                        }`}
                    >
                      {stat.label}
                    </p>

                    <div
                      className={`
                        absolute
                        bottom-0
                        left-0
                        h-px
                        w-0
                        transition-all
                        duration-400
                        group-hover:w-full
                        ${isDark ? "bg-[#39ff88]" : "bg-[#10b981]"}
                      `}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ==================================================
                TECHNOLOGIES DETECTED
            ================================================== */}
            {languages.length > 0 && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className={`
                  mt-5
                  rounded-2xl
                  border
                  p-6
                  backdrop-blur-md
                  ${isDark
                    ? "border-white/[0.07] bg-white/[0.03]"
                    : "border-black/[0.06] bg-white/70 shadow-sm"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Code2
                    size={18}
                    className={isDark ? "text-[#39ff88]" : "text-[#10b981]"}
                  />
                  <h3
                    className={`font-semibold ${isDark ? "text-white" : "text-slate-900"
                      }`}
                  >
                    Technologies Detected
                  </h3>
                  <span
                    className={`font-mono text-[10px] ${isDark ? "text-gray-500" : "text-slate-400"
                      }`}
                  >
                    from repositories
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {languages.map(([language, count]) => (
                    <span
                      key={language}
                      className={`
                        cursor-default
                        rounded-full
                        border
                        px-4
                        py-2
                        text-sm
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        ${isDark
                          ? "border-white/[0.08] bg-white/[0.02] text-gray-300 hover:border-[#39ff88]/40 hover:bg-[#39ff88]/10 hover:text-[#39ff88]"
                          : "border-black/[0.06] bg-black/[0.03] text-slate-700 hover:border-[#10b981]/40 hover:bg-[#10b981]/10 hover:text-[#10b981]"
                        }
                      `}
                    >
                      <span className="font-medium">{language}</span>
                      <span
                        className={`ml-2 text-xs ${isDark ? "text-gray-500" : "text-slate-400"
                          }`}
                      >
                        {count} {count === 1 ? "repo" : "repos"}
                      </span>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ==================================================
                ACTIVITY CALENDAR
            ================================================== */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className={`
                mt-5
                overflow-hidden
                rounded-2xl
                border
                p-6
                backdrop-blur-md
                ${isDark
                  ? "border-white/[0.07] bg-white/[0.03]"
                  : "border-black/[0.06] bg-white/70 shadow-sm"
                }
              `}
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <Activity
                      size={18}
                      className={isDark ? "text-[#39ff88]" : "text-[#10b981]"}
                    />
                    <h3
                      className={`font-semibold ${isDark ? "text-white" : "text-slate-900"
                        }`}
                    >
                      GitHub Activity
                    </h3>
                  </div>
                  <p
                    className={`mt-1 text-xs ${isDark ? "text-gray-400" : "text-slate-500"
                      }`}
                  >
                    Public contribution graph
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 text-xs ${isDark ? "text-gray-500" : "text-slate-500"
                    }`}
                >
                  <CalendarDays size={14} />
                  Last 365 days
                </div>
              </div>

              {/* Grid */}
              <div className="mt-7 overflow-x-auto pb-2">
                <div className="flex min-w-[780px] gap-1">
                  {Array.from({ length: 53 }).map((_, column) => {
                    const start = column * 7;
                    const week = activity.slice(start, start + 7);

                    return (
                      <div key={column} className="flex flex-col gap-1">
                        {Array.from({ length: 7 }).map((_, row) => {
                          const day = week[row];
                          return (
                            <div
                              key={row}
                              title={
                                day
                                  ? `${day.count} activities on ${day.date}`
                                  : ""
                              }
                              className={`
                                h-3
                                w-3
                                rounded-[3px]
                                transition-transform
                                duration-200
                                hover:scale-125
                                ${day ? getActivityClass(day.count) : getActivityClass(0)}
                              `}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div
                className={`mt-5 flex items-center justify-end gap-2 text-xs ${isDark ? "text-gray-500" : "text-slate-500"
                  }`}
              >
                <span>Less</span>
                <span className={`h-3 w-3 rounded-[3px] ${isDark ? "bg-white/[0.05]" : "bg-black/[0.06]"}`} />
                <span className={`h-3 w-3 rounded-[3px] ${isDark ? "bg-[#39ff88]/20" : "bg-[#10b981]/25"}`} />
                <span className={`h-3 w-3 rounded-[3px] ${isDark ? "bg-[#39ff88]/40" : "bg-[#10b981]/50"}`} />
                <span className={`h-3 w-3 rounded-[3px] ${isDark ? "bg-[#39ff88]/60" : "bg-[#10b981]/75"}`} />
                <span className={`h-3 w-3 rounded-[3px] ${isDark ? "bg-[#39ff88]/90" : "bg-[#10b981]"}`} />
                <span>More</span>
              </div>
            </motion.div>

            {/* ==================================================
                REPOSITORIES (MINIMAL TRANSPARENT CARDS)
            ================================================== */}
            <motion.div
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-10"
            >
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3
                    className={`flex items-center gap-2 font-semibold ${isDark ? "text-white" : "text-slate-900"
                      }`}
                  >
                    <GitBranch
                      size={18}
                      className={isDark ? "text-[#39ff88]" : "text-[#10b981]"}
                    />
                    Repositories
                  </h3>
                  <p
                    className={`mt-1 text-xs ${isDark ? "text-gray-400" : "text-slate-500"
                      }`}
                  >
                    {repos.length} public repositories
                  </p>
                </div>

                <a
                  href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-flex
                    items-center
                    gap-1
                    text-xs
                    font-medium
                    transition-colors
                    ${isDark
                      ? "text-[#39ff88] hover:text-white"
                      : "text-[#10b981] hover:text-slate-900"
                    }
                  `}
                >
                  View all on GitHub
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="grid gap-4 md:grid-cols-2"
              >
                {repos.map((repo) => (
                  <motion.div key={repo.id} variants={cardVariants}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        group
                        relative
                        block
                        overflow-hidden
                        rounded-2xl
                        border
                        p-6
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        ${isDark
                          ? "border-white/[0.07] bg-white/[0.03] hover:border-[#39ff88]/30 hover:bg-white/[0.05]"
                          : "border-black/[0.06] bg-white/70 hover:border-[#10b981]/30 hover:bg-white/90 shadow-sm"
                        }
                      `}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h4
                            className={`
                              truncate
                              text-base
                              font-semibold
                              transition-colors
                              ${isDark
                                ? "text-white group-hover:text-[#39ff88]"
                                : "text-slate-900 group-hover:text-[#10b981]"
                              }
                            `}
                          >
                            {repo.name}
                          </h4>

                          <p
                            className={`mt-2 line-clamp-2 text-sm leading-6 ${isDark ? "text-gray-400" : "text-slate-600"
                              }`}
                          >
                            {repo.description || "No description provided."}
                          </p>
                        </div>

                        <ExternalLink
                          size={16}
                          className={`
                            shrink-0
                            transition-all
                            duration-300
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                            ${isDark
                              ? "text-gray-600 group-hover:text-[#39ff88]"
                              : "text-slate-400 group-hover:text-[#10b981]"
                            }
                          `}
                        />
                      </div>

                      <div
                        className={`
                          mt-5
                          flex
                          flex-wrap
                          items-center
                          gap-4
                          text-xs
                          ${isDark ? "text-gray-400" : "text-slate-500"}
                        `}
                      >
                        {repo.language && (
                          <span
                            className={`
                              rounded-full
                              border
                              px-3
                              py-1
                              font-medium
                              ${isDark
                                ? "border-white/[0.06] bg-white/[0.03] text-gray-300"
                                : "border-black/[0.06] bg-black/[0.03] text-slate-700"
                              }
                            `}
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

                        <span className="ml-auto opacity-75">
                          Updated {formatDate(repo.pushed_at)}
                        </span>
                      </div>

                      {/* Hover bottom line */}
                      <div
                        className={`
                          absolute
                          bottom-0
                          left-0
                          h-px
                          w-0
                          transition-all
                          duration-400
                          group-hover:w-full
                          ${isDark ? "bg-[#39ff88]" : "bg-[#10b981]"}
                        `}
                      />
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Last updated */}
            <div
              className={`
                mt-10
                flex
                flex-col
                justify-between
                gap-3
                border-t
                pt-6
                sm:flex-row
                sm:items-center
                ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}
              `}
            >
              <div
                className={`flex items-center gap-2 text-xs ${isDark ? "text-gray-500" : "text-slate-500"
                  }`}
              >
                <span
                  className={`h-2 w-2 animate-pulse rounded-full ${isDark ? "bg-[#39ff88]" : "bg-[#10b981]"
                    }`}
                />
                Live GitHub sync
              </div>

              {lastUpdated && (
                <p
                  className={`font-mono text-xs ${isDark ? "text-gray-500" : "text-slate-400"
                    }`}
                >
                  Last synced:{" "}
                  {lastUpdated.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              )}
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Footer label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`
            mt-10
            flex
            items-center
            justify-center
            gap-3
            font-mono
            text-xs
            ${isDark ? "text-gray-500" : "text-slate-400"}
          `}
        >
          <span className={isDark ? "text-[#39ff88]/50" : "text-[#10b981]/60"}>
            {"<github />"}
          </span>
          <span>Code • Commit • Deploy</span>
          <span className={isDark ? "text-[#39ff88]/50" : "text-[#10b981]/60"}>
            {"</>"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}