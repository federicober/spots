import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Track } from "../../api/models";
import useApi from "../../api";
import { H5 } from "../../core/styled";
import LazyTrackAccordion from "./LazyTrackAccordion";

interface MyTopTracksNavProps {
  stageTrack: (track: Track) => void;
  isTrackAdded: (track: Track) => boolean;
}

const TERMS: [string, "short_term" | "medium_term" | "long_term"][] = [
  ["Short term", "short_term"],
  ["Medium term", "medium_term"],
  ["Long term", "long_term"],
];
export default function MyTopTracksNav({
  stageTrack,
  isTrackAdded,
}: MyTopTracksNavProps) {
  const api = useApi();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <H5>My Top Tracks</H5>
      </AccordionSummary>
      <AccordionDetails>
        {TERMS.map(([title, term]) => (
          <LazyTrackAccordion
            key={term}
            title={`My top tracks ${title}`}
            loadTracks={() => api.myTopTracks(term)}
            isTrackAdded={isTrackAdded}
            stageTrack={stageTrack}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
