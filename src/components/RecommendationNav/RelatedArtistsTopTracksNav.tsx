import { useEffect, useState } from "react";

import { Artist, Track } from "../../api/models";
import useApi from "../../api";
import { weightedCompact } from "../../utils/tracks";
import ArtistTopTracksNav from "./ArtistTopTracksNav";

interface RelatedArtistsTopTracksNavProps {
  artistsInPlaylist: Artist[];
  stageTrack: (track: Track) => void;
  isTrackAdded: (track: Track) => boolean;
}

export default function RelatedArtistsTopTracksNav({
  artistsInPlaylist,
  stageTrack,
  isTrackAdded,
}: RelatedArtistsTopTracksNavProps) {
  const api = useApi();
  const [relatedArtists, setRelatedArtists] = useState<Artist[]>([]);

  useEffect(() => {
    async function fetchData() {
      const r = (
        await Promise.all(
          artistsInPlaylist.map((artist) => api.artistRelatedArtists(artist.id))
        )
      ).flatMap((artists, idx) =>
        artists.map(
          (artist) =>
            [artist, artistsInPlaylist.length - idx] as [Artist, number]
        )
      );
      setRelatedArtists(
        weightedCompact(r).filter(
          (relatedArtist) =>
            !artistsInPlaylist.find((artist) => artist.id === relatedArtist.id)
        )
      );
    }
    fetchData();
  }, [artistsInPlaylist]);

  return (
    <ArtistTopTracksNav
      artists={relatedArtists}
      stageTrack={stageTrack}
      isTrackAdded={isTrackAdded}
      title="Related artists"
    />
  );
}
