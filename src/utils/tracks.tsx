import { Artist, Track } from "../api/models";
import lodash from "lodash";

export function countArtists(tracks: Track[]) {
  return weightedCompact(tracks.map((track) => [track.artists[0], 1]));
}

function incRecordKey(rec: Record<string, number>, k: string, inc: number) {
  if (k in rec) {
    rec[k] += inc;
  } else {
    rec[k] = inc;
  }
}

function recordToArray(r: Record<string, number>) {
  return Object.entries(r).sort(([_, count1], [__, count2]) => count2 - count1);
}

export function weightedCompact(arr: [Artist, number][]): Artist[] {
  const artistIdCount: Record<string, number> = {};
  const allArtists = lodash.uniq(arr.map(([artist, _]) => artist));
  arr.forEach(([artist, weight]) =>
    incRecordKey(artistIdCount, artist.id, weight)
  );
  const orderedArtists: Artist[] = lodash.compact(
    recordToArray(artistIdCount).map(([artistId, _count]) =>
      allArtists.find((artist) => artist.id === artistId)
    )
  );
  return orderedArtists;
}
