import { NextResponse } from "next/server";

export interface LiveStream {
  videoId: string;
  title: string;
  channelTitle: string;
  channelId: string;
  thumbnail: string;
  viewers?: string;
}

// In-memory cache: stores result + timestamp
let cache: { data: LiveStream[]; timestamp: number } | null = null;
const CACHE_DURATION_MS = 3 * 60 * 1000; // 3 minutes

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SEARCH_QUERY = process.env.YOUTUBE_SEARCH_QUERY || "Telugu Network Minecraft";

export async function GET() {
  // If no API key configured, return empty gracefully
  if (!YOUTUBE_API_KEY) {
    return NextResponse.json({ streams: [], reason: "no_api_key" });
  }

  // Return cached data if still fresh
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION_MS) {
    return NextResponse.json({ streams: cache.data, cached: true });
  }

  try {
    // Search for live streams matching our server
    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("q", SEARCH_QUERY);
    searchUrl.searchParams.set("type", "video");
    searchUrl.searchParams.set("eventType", "live");
    searchUrl.searchParams.set("maxResults", "8");
    searchUrl.searchParams.set("order", "viewCount");
    searchUrl.searchParams.set("key", YOUTUBE_API_KEY);

    const searchRes = await fetch(searchUrl.toString(), {
      next: { revalidate: 180 },
    });

    if (!searchRes.ok) {
      const errText = await searchRes.text();
      console.error("YouTube API error:", searchRes.status, errText);
      // Return stale cache if available, otherwise empty
      if (cache) {
        return NextResponse.json({ streams: cache.data, stale: true });
      }
      return NextResponse.json({ streams: [], reason: "api_error" });
    }

    const searchData = await searchRes.json();
    const items = searchData.items || [];

    if (items.length === 0) {
      cache = { data: [], timestamp: Date.now() };
      return NextResponse.json({ streams: [] });
    }

    // Get live viewer counts from video details
    const videoIds = items.map((item: any) => item.id.videoId).join(",");
    const detailsUrl = new URL(
      "https://www.googleapis.com/youtube/v3/videos"
    );
    detailsUrl.searchParams.set("part", "liveStreamingDetails,statistics");
    detailsUrl.searchParams.set("id", videoIds);
    detailsUrl.searchParams.set("key", YOUTUBE_API_KEY);

    const detailsRes = await fetch(detailsUrl.toString(), {
      next: { revalidate: 180 },
    });
    const detailsData = detailsRes.ok ? await detailsRes.json() : { items: [] };

    // Build viewer count map
    const viewerMap: Record<string, string> = {};
    for (const v of detailsData.items || []) {
      const count =
        v.liveStreamingDetails?.concurrentViewers ||
        v.statistics?.viewCount ||
        "0";
      viewerMap[v.id] = count;
    }

    // Map to our stream format
    const streams: LiveStream[] = items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      thumbnail:
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.medium?.url ||
        item.snippet.thumbnails.default?.url,
      viewers: viewerMap[item.id.videoId] || undefined,
    }));

    // Update cache
    cache = { data: streams, timestamp: Date.now() };

    return NextResponse.json({ streams });
  } catch (err) {
    console.error("Live streams fetch error:", err);
    if (cache) {
      return NextResponse.json({ streams: cache.data, stale: true });
    }
    return NextResponse.json({ streams: [], reason: "fetch_error" });
  }
}
