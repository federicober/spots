import { Artist, Track } from "../api/models";
import lodash from "lodash";

export function countArtists(tracks: Track[]) {
  const artistIdCount: Record<string, number> = {};
  const allArtists: Artist[] = [];
  tracks
    .map((track) => track.artists)
    .flat()
    .forEach((artist) => {
      if (artist.id in artistIdCount) {
        artistIdCount[artist.id] = ++artistIdCount[artist.id];
      } else {
        allArtists.push(artist);
        artistIdCount[artist.id] = 1;
      }
    });
  const orderedArtists = Object.entries(artistIdCount)
    .sort((a, b) => b[1] - a[1])
    .map(([artistId, _count]) =>
      allArtists.find((artist) => artist.id === artistId)
    );
  return lodash.compact(orderedArtists);
}
