import { useState } from "react";

import ExpandMore from "@mui/icons-material/ExpandMore";
import AddCircle from "@mui/icons-material/AddCircle";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import { Artist, Track } from "../../api/models";
import useApi from "../../api";
import { H5 } from "../../core/styled";
import LazyTrackAccordion from "./LazyTrackAccordion";

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
  const STEP = 5;

  const api = useApi();

  const [numArtists, setNumArtists] = useState<number>(5);
  const artists = artistsInPlaylist;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <H5>Artist in Playlist</H5>
      </AccordionSummary>
      <AccordionDetails>
        {artists.slice(0, numArtists).map((artist) => (
          <LazyTrackAccordion
            key={artist.id}
            isTrackAdded={isTrackAdded}
            loadTracks={() => api.artistTopTracks(artist.id, "FR")}
            stageTrack={stageTrack}
            title={artist.name}
          />
        ))}
      </AccordionDetails>
      <Stack direction="row" justifyContent="center">
        {numArtists < artists.length && (
          <Tooltip title="See more artists">
            <IconButton onClick={() => setNumArtists((prev) => prev + STEP)}>
              <AddCircle />
            </IconButton>
          </Tooltip>
        )}
        {numArtists > STEP && (
          <IconButton onClick={() => setNumArtists((prev) => prev - STEP)}>
            <RemoveCircle />
          </IconButton>
        )}
      </Stack>
    </Accordion>
  );
}
