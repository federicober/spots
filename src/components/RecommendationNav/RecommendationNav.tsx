import { useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import { Artist, Track } from "../../api/models";
import { Item, H4 } from "../../core/styled";
import { countArtists } from "../../utils/tracks";
import ArtistsTopTracksNav from "./ArtistsTopTracksNav";
import MyTopTracksNav from "./MyTopTracksNav";

interface RecommendationNavProps {
  tracks: Track[];
  stageTrack: (track: Track) => void;
  isTrackAdded: (track: Track) => boolean;
}
export default function RecommendationNav({
  tracks,
  isTrackAdded,
  stageTrack,
}: RecommendationNavProps) {
  const [artists, setArtists] = useState<Artist[]>([]);

  // get all artists from tracks
  useEffect(() => setArtists(countArtists(tracks)), [tracks]);

  return (
    <Item>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <H4 sx={{ margin: "auto" }}>Recommendations</H4>
      </Stack>
      <Divider sx={{ marginTop: 4, marginBottom: 4 }} />
      <ArtistsTopTracksNav
        artistsInPlaylist={artists}
        stageTrack={stageTrack}
        isTrackAdded={isTrackAdded}
      />
      <MyTopTracksNav stageTrack={stageTrack} isTrackAdded={isTrackAdded} />
    </Item>
  );
}
