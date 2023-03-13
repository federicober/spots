import { Term, Track } from "./models";
import SpotifyApi from "./sdk";

interface Cached<T> {
  exp: number;
  data: T;
}

async function _fromCache<T>(
  cacheKey: string,
  promiseFactory: () => Promise<T>,
  expirySeconds: number
): Promise<T> {
  let cached: Cached<T> | null = null;
  const completeCacheKey = "cache:" + cacheKey;
  try {
    cached = JSON.parse(localStorage.getItem(completeCacheKey) || "");
  } catch (e) {
    cached = null;
  }
  const now = Math.floor(Date.now() / 1000);
  if (cached !== null && cached.exp > now) {
    return cached.data;
  }
  const data = await promiseFactory();
  const toCache: Cached<T> = { data: data, exp: now + expirySeconds };
  localStorage.setItem(completeCacheKey, JSON.stringify(toCache));
  return data;
}

const HOUR = 3600;
const DAY = 3600 * 24;
const WEEK = 3600 * 24 * 7;

const TermToCacheExp: Record<Term, number> = {
  short_term: HOUR,
  medium_term: DAY,
  long_term: WEEK,
};

export default class CachedSpotifyApi extends SpotifyApi {
  async myTopTracks(term: Term = "medium_term") {
    const cacheKey = `api:myTopTracks:${term}`;
    return _fromCache(
      cacheKey,
      () => SpotifyApi.prototype.myTopTracks.call(this, term),
      TermToCacheExp[term]
    );
  }

  async artistTopTracks(artistId: string, market: string): Promise<Track[]> {
    const cacheKey = `api:artistTopTracks:${artistId}:${market}`;
    return _fromCache(
      cacheKey,
      () => SpotifyApi.prototype.artistTopTracks.call(this, artistId, market),
      DAY
    );
  }
}
