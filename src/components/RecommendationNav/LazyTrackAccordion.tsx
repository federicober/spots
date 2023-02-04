import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Track } from "../../api/models";
import { H6 } from "../../core/styled";
import { TrackListItem } from "../TrackListItem";

interface LazyAccordionProps {
  title: string;
  stageTrack: (track: Track) => void;
  isTrackAdded: (track: Track) => boolean;
  loadTracks: Promise<Track[]>;
}
export function LazyTrackAccordion({
  title,
  isTrackAdded,
  loadTracks,
  stageTrack,
}: LazyAccordionProps) {
  const [tracks, setTracks] = useState<Track[]>([]);

  async function loadAndSetTracks() {
    setTracks(await loadTracks);
  }

  const unaddedTracks = tracks.filter((track) => !isTrackAdded(track));

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />} onClick={loadAndSetTracks}>
        <H6>{title}</H6>
      </AccordionSummary>
      <AccordionDetails>
        {unaddedTracks.length > 0 ? (
          unaddedTracks.map((track) => (
            <TrackListItem
              key={track.id}
              track={track}
              playable={true}
              onAdd={() => stageTrack(track)}
            />
          ))
        ) : (
          <Typography color="grey">All songs are in playlist</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
