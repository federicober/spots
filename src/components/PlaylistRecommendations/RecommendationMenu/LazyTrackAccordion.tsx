import { useState } from "react";

import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { Track } from "../../../api/models";
import { H6 } from "../../../core/styled";
import TrackListItem from "../../TrackListItem";

interface LazyAccordionProps {
  title: string;
  stageTrack: (track: Track) => void;
  isTrackAdded: (track: Track) => boolean;
  loadTracks: () => Promise<Track[]>;
}
export default function LazyTrackAccordion({
  title,
  isTrackAdded,
  loadTracks,
  stageTrack,
}: LazyAccordionProps) {
  const [tracks, setTracks] = useState<Track[] | null>(null);

  async function loadAndSetTracks() {
    setTracks(await loadTracks());
  }

  const unaddedTracks =
    tracks !== null ? tracks.filter((track) => !isTrackAdded(track)) : [];

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />} onClick={loadAndSetTracks}>
        <H6>{title}</H6>
      </AccordionSummary>
      <AccordionDetails>
        {tracks === null ? (
          <Typography color="grey">Loading...</Typography>
        ) : unaddedTracks.length === 0 ? (
          <Typography color="grey">All songs are in playlist</Typography>
        ) : (
          unaddedTracks.map((track) => (
            <TrackListItem
              key={track.id}
              track={track}
              playable={true}
              onAdd={() => stageTrack(track)}
            />
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
}
