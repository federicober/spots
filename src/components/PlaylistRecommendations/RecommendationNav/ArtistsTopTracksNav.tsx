import { Artist, Track } from "../../../api/models";
import ArtistTopTracksNav from "./ArtistTopTracksNav";

interface ArtistsTopTracksNavProps {
  artistsInPlaylist: Artist[];
  stageTrack: (track: Track) => void;
  isTrackAdded: (track: Track) => boolean;
}

export default function ArtistsTopTracksNav({
  artistsInPlaylist,
  stageTrack,
  isTrackAdded,
}: ArtistsTopTracksNavProps) {
  return (
    <ArtistTopTracksNav
      artists={artistsInPlaylist}
      stageTrack={stageTrack}
      isTrackAdded={isTrackAdded}
      title="Artists in playlist"
    />
  );
}
