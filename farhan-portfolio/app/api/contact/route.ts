import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

const GITHUB_API = "https://api.github.com";

function githubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "Farhan-Portfolio",
  };
}

async function githubFetch(
  endpoint: string,
  request: NextRequest
) {
  const response = await fetch(`${GITHUB_API}${endpoint}`, {
    method: "GET",
    headers: githubHeaders(),
    cache: "no-store",
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    return NextResponse.json(
      {
        error:
          data?.message ||
          `GitHub API request failed with status ${response.status}`,
        status: response.status,
      },
      {
        status: response.status,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type");
    const username =
      searchParams.get("username")?.trim() || "Farhan910191";

    if (!username) {
      return NextResponse.json(
        {
          error: "GitHub username is required",
        },
        { status: 400 }
      );
    }

    // Only allow safe GitHub username characters
    if (!/^[a-zA-Z0-9-]+$/.test(username)) {
      return NextResponse.json(
        {
          error: "Invalid GitHub username",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // PROFILE
    // ==========================================

    if (type === "profile") {
      return githubFetch(
        `/users/${encodeURIComponent(username)}`,
        request
      );
    }

    // ==========================================
    // REPOSITORIES
    // ==========================================

    if (type === "repos") {
      return githubFetch(
        `/users/${encodeURIComponent(
          username
        )}/repos?per_page=100&sort=updated&direction=desc`,
        request
      );
    }

    // ==========================================
    // PUBLIC EVENTS
    // ==========================================

    if (type === "events") {
      return githubFetch(
        `/users/${encodeURIComponent(
          username
        )}/events/public?per_page=100`,
        request
      );
    }

    // ==========================================
    // INVALID TYPE
    // ==========================================

    return NextResponse.json(
      {
        error:
          "Invalid type. Use profile, repos, or events.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("GitHub API route error:", error);

    return NextResponse.json(
      {
        error: "Unable to connect to GitHub API.",
      },
      { status: 500 }
    );
  }
}