"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ExternalLink,
  GitBranch,
  GitCommit,
  RefreshCw,
  Star,
  Users,
  GitFork,
  Code2,
  CalendarDays,
  BookOpen,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

// ======================================================
// GITHUB USERNAME
// ======================================================

const GITHUB_USERNAME = "Farhan910191";

// Auto refresh every 5 minutes
const REFRESH_TIME = 5 * 60 * 1000;

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

  // FIX #2
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

  // ====================================================
  // FETCH GITHUB DATA
  // ====================================================

  const fetchGitHubData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // ==================================================
      // 1. PROFILE
      // ==================================================

      const profileResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
          cache: "no-store",
        }
      );

      if (!profileResponse.ok) {
        const details = await profileResponse.json().catch(() => null);
        throw new Error(
          details?.error ||
            `GitHub profile could not be loaded (${profileResponse.status}).`
        );
      }

      const profileData: GitHubProfile =
        await profileResponse.json();

      // ==================================================
      // 2. REPOSITORIES
      // ==================================================

      const reposResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?per_page=100&sort=updated&direction=desc`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
          cache: "no-store",
        }
      );

      if (!reposResponse.ok) {
        const details = await reposResponse.json().catch(() => null);
        throw new Error(
          details?.error ||
            `GitHub repositories could not be loaded (${reposResponse.status}).`
        );
      }

      const reposData: GitHubRepo[] =
        await reposResponse.json();

      // ==================================================
      // 3. PUBLIC EVENTS
      // ==================================================

      const eventsResponse = await fetch(
        `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/events/public?per_page=100`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
          cache: "no-store",
        }
      );

      let eventsData: GitHubEvent[] = [];

      if (eventsResponse.ok) {
        eventsData = await eventsResponse.json();
      }

      // ==================================================
      // 4. ACTIVITY MAP
      // ==================================================

      const activityMap: Record<
        string,
        number
      > = {};

      const today = new Date();

      // Create 365 days
      for (let i = 0; i < 365; i++) {
        const date = new Date(today);

        date.setDate(
          today.getDate() - i
        );

        const dateString =
          date.toISOString().split("T")[0];

        activityMap[dateString] = 0;
      }

      // ==================================================
      // 5. ADD REAL PUBLIC EVENTS
      // ==================================================

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

          // PushEvent can contain multiple commits
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

      // ==================================================
      // 6. CONVERT ACTIVITY TO ARRAY
      // ==================================================

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
      // 7. UPDATE STATE
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
          : "Unable to load GitHub data. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }, []);

  // ====================================================
  // INITIAL FETCH + AUTO REFRESH
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
          (languageMap[repo.language] || 0) + 1;
      }
    });

    return Object.entries(languageMap).sort(
      (a, b) => b[1] - a[1]
    );
  }, [repos]);

  // ====================================================
  // ACTIVITY COLOR
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
  // EVENT NAME
  // ====================================================

  const getEventName = (
    type: string
  ) => {
    switch (type) {
      case "PushEvent":
        return "Pushed commits";

      case "CreateEvent":
        return "Created repository";

      case "PullRequestEvent":
        return "Pull request activity";

      case "IssuesEvent":
        return "Issue activity";

      case "WatchEvent":
        return "Starred repository";

      case "ForkEvent":
        return "Forked repository";

      case "DeleteEvent":
        return "Deleted repository";

      case "ReleaseEvent":
        return "Created release";

      default:
        return type
          .replace("Event", "")
          .replace(
            /([A-Z])/g,
            " $1"
          )
          .trim();
    }
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
  // LOADING SCREEN
  // ====================================================

  if (loading && !profile) {
    return (
      <section
        id="github"
        className="border-t border-white/[0.05] py-28"
      >
        <div className="container-custom">

          <div className="rounded-[32px] border border-white/[0.08] bg-[#111113] p-12 text-center">

            <RefreshCw
              size={32}
              className="mx-auto animate-spin text-[#39ff88]"
            />

            <p className="mt-5 text-gray-500">
              Loading GitHub data...
            </p>

            <p className="mt-2 text-xs text-gray-700">
              Connecting to GitHub
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
      className="border-t border-white/[0.05] py-28"
    >
      <div className="container-custom">

        <div className="overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#111113]">

          <div className="relative p-7 sm:p-10 lg:p-14">

            {/* Background glow */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#39ff88]/10 blur-[120px]"
            />

            <div className="relative">

              {/* ==================================================
                  HEADER
              ================================================== */}

              <div className="flex flex-col justify-between gap-8 lg:flex-row">

                <div>

                  {/* GitHub icon */}

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#39ff88] text-black">

                    <FaGithub
                      size={32}
                    />

                  </div>

                  <p className="mt-7 text-sm uppercase tracking-[0.3em] text-[#39ff88]">
                    08 — GitHub
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
                    Code in public.
                  </h2>

                  <p className="mt-4 max-w-2xl leading-7 text-gray-500">
                    Explore my GitHub profile,
                    repositories, technologies,
                    projects and development
                    activity.
                  </p>

                </div>

                {/* Buttons */}

                <div className="flex flex-wrap items-start gap-3">

                  <button
                    type="button"
                    onClick={fetchGitHubData}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-5 py-3 text-sm text-gray-400 transition hover:border-[#39ff88]/30 hover:text-[#39ff88] disabled:opacity-50"
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

                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#39ff88]/30 px-5 py-3 text-sm text-[#39ff88] transition hover:bg-[#39ff88] hover:text-black"
                  >

                    GitHub Profile

                    <ExternalLink
                      size={16}
                    />

                  </a>

                </div>

              </div>

              {/* ==================================================
                  PROFILE CARD
              ================================================== */}

              {profile && (
                <div className="mt-12 rounded-3xl border border-white/[0.07] bg-black/30 p-6">

                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-5">

                      <img
                        src={
                          profile.avatar_url
                        }
                        alt={
                          profile.name ||
                          profile.login
                        }
                        className="h-20 w-20 rounded-full border-2 border-[#39ff88]/20"
                      />

                      <div>

                        <h3 className="text-xl font-bold text-white">
                          {profile.name ||
                            profile.login}
                        </h3>

                        <p className="mt-1 text-sm text-[#39ff88]">
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

                    <div className="flex items-center gap-2 text-xs text-gray-600">

                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#39ff88]" />

                      Live GitHub data

                    </div>

                  </div>

                </div>
              )}

              {/* ==================================================
                  STATS
              ================================================== */}

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

                {stats.map(
                  (stat) => {

                    const Icon =
                      stat.icon;

                    return (
                      <div
                        key={
                          stat.label
                        }
                        className="rounded-2xl border border-white/[0.07] bg-black/30 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#39ff88]/30"
                      >

                        <Icon
                          size={19}
                          className="text-[#39ff88]"
                        />

                        <p className="mt-5 text-2xl font-bold text-white">
                          {stat.value}
                        </p>

                        <p className="mt-1 text-xs text-gray-600">
                          {stat.label}
                        </p>

                      </div>
                    );
                  }
                )}

              </div>

              {/* ==================================================
                  TECHNOLOGIES
              ================================================== */}

              {languages.length > 0 && (
                <div className="mt-8 rounded-2xl border border-white/[0.07] bg-black/30 p-6">

                  <div className="flex items-center gap-3">

                    <Code2
                      size={18}
                      className="text-[#39ff88]"
                    />

                    <h3 className="font-semibold text-white">
                      Technologies
                    </h3>

                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">

                    {languages.map(
                      ([language, count]) => (
                        <div
                          key={
                            language
                          }
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-gray-400"
                        >

                          <span className="text-white">
                            {language}
                          </span>

                          <span className="ml-2 text-gray-700">
                            {count}{" "}
                            {count ===
                            1
                              ? "repo"
                              : "repos"}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

              {/* ==================================================
                  GITHUB ACTIVITY
              ================================================== */}

              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-black/30 p-6">

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
                      Real public GitHub events
                    </p>

                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-700">

                    <CalendarDays
                      size={14}
                    />

                    Activity calendar

                  </div>

                </div>

                {/* Activity grid */}

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
                            key={
                              column
                            }
                            className="flex flex-col gap-1"
                          >

                            {Array.from({
                              length: 7,
                            }).map(
                              (_, row) => {

                                const day =
                                  week[
                                    row
                                  ];

                                return (
                                  <div
                                    key={
                                      row
                                    }
                                    title={
                                      day
                                        ? `${day.count} public activities on ${day.date}`
                                        : ""
                                    }
                                    className={`h-3 w-3 rounded-[3px] ${
                                      day
                                        ? getActivityClass(
                                            day.count
                                          )
                                        : "bg-white/[0.05]"
                                    }`}
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

                {/* Legend */}

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

              </div>

              {/* ==================================================
                  RECENT ACTIVITY
              ================================================== */}

              {events.length > 0 && (
                <div className="mt-8">

                  <div className="mb-5 flex items-center justify-between">

                    <div>

                      <h3 className="flex items-center gap-2 font-semibold text-white">

                        <GitCommit
                          size={18}
                          className="text-[#39ff88]"
                        />

                        Recent Activity

                      </h3>

                      <p className="mt-1 text-xs text-gray-600">
                        Latest public GitHub events
                      </p>

                    </div>

                    <a
                      href={`https://github.com/${GITHUB_USERNAME}?tab=overview`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#39ff88] hover:text-white"
                    >
                      View all →
                    </a>

                  </div>

                  <div className="grid gap-3">

                    {events
                      .slice(0, 8)
                      .map(
                        (event) => (
                          <a
                            key={
                              event.id
                            }
                            href={`https://github.com/${event.repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-2xl border border-white/[0.07] bg-black/30 p-5 transition duration-300 hover:border-[#39ff88]/30"
                          >

                            <div className="flex items-start gap-4">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#39ff88]/10 text-[#39ff88]">

                                {event.type ===
                                "PushEvent" ? (
                                  <GitCommit
                                    size={18}
                                  />
                                ) : (
                                  <Code2
                                    size={18}
                                  />
                                )}

                              </div>

                              <div className="min-w-0 flex-1">

                                <p className="font-medium text-white">
                                  {getEventName(
                                    event.type
                                  )}
                                </p>

                                <p className="mt-1 truncate text-sm text-gray-600">
                                  {event.repo.name}
                                </p>

                                <p className="mt-2 text-xs text-gray-700">
                                  {formatDate(
                                    event.created_at
                                  )}
                                </p>

                              </div>

                              <ExternalLink
                                size={15}
                                className="text-gray-700 transition group-hover:text-[#39ff88]"
                              />

                            </div>

                          </a>
                        )
                      )}

                  </div>

                </div>
              )}

              {/* ==================================================
                  ALL REPOSITORIES
              ================================================== */}

              <div className="mt-10">

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
                    className="text-xs text-[#39ff88] hover:text-white"
                  >
                    View on GitHub →
                  </a>

                </div>

                <div className="grid gap-4 md:grid-cols-2">

                  {repos.map(
                    (repo) => (
                      <a
                        key={
                          repo.id
                        }
                        href={
                          repo.html_url
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-2xl border border-white/[0.07] bg-black/30 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#39ff88]/30"
                      >

                        <div className="flex items-start justify-between gap-4">

                          <div className="min-w-0">

                            <h4 className="truncate text-base font-semibold text-white group-hover:text-[#39ff88]">
                              {repo.name}
                            </h4>

                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                              {repo.description ||
                                "No description available."}
                            </p>

                          </div>

                          <ExternalLink
                            size={16}
                            className="shrink-0 text-gray-700 group-hover:text-[#39ff88]"
                          />

                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-600">

                          {repo.language && (
                            <span className="rounded-full bg-white/[0.04] px-3 py-1">
                              {repo.language}
                            </span>
                          )}

                          <span className="flex items-center gap-1">

                            <Star
                              size={13}
                            />

                            {repo.stargazers_count}

                          </span>

                          <span className="flex items-center gap-1">

                            <GitFork
                              size={13}
                            />

                            {repo.forks_count}

                          </span>

                          <span className="ml-auto">
                            Updated{" "}
                            {formatDate(
                              repo.pushed_at
                            )}
                          </span>

                        </div>

                      </a>
                    )
                  )}

                </div>

              </div>

              {/* ==================================================
                  LAST UPDATED
              ================================================== */}

              <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">

                <div className="flex items-center gap-2 text-xs text-gray-700">

                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#39ff88]" />

                  Live GitHub data

                </div>

                {lastUpdated && (
                  <p className="text-xs text-gray-700">
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
                  ERROR
              ================================================== */}

              {error && (
                <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}