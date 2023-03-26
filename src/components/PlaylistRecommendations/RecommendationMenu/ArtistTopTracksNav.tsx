import { useState } from "react";

import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowCircleDown from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUp from "@mui/icons-material/ArrowCircleUp";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import { Artist, Track } from "../../../api/models";
import useApi from "../../../api";
import { H5 } from "../../../core/styled";
import LazyTrackAccordion from "./LazyTrackAccordion";

const PAGE_SIZE = 5;

interface ArtistTopTracksNavProps {
  artists: Artist[];
  stageTrack: (track: Track) => void;
  isTrackAdded: (track: Track) => boolean;
  title: string;
}
export default function ArtistTopTracksNav({
  artists,
  stageTrack,
  isTrackAdded,
  title,
}: ArtistTopTracksNavProps) {
  const api = useApi();
  const [page, setPage] = useState<number>(0);

  const pageLowerLimit = page * PAGE_SIZE;
  const pageUpperLimit = (page + 1) * PAGE_SIZE;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <H5>{title}</H5>
      </AccordionSummary>
      <AccordionDetails>
        {artists.slice(pageLowerLimit, pageUpperLimit).map((artist) => (
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
        {pageUpperLimit < artists.length && (
          <Tooltip title="See more artists">
            <IconButton onClick={() => setPage((prev) => prev + 1)}>
              <ArrowCircleDown />
            </IconButton>
          </Tooltip>
        )}
        {pageLowerLimit > 0 && (
          <IconButton onClick={() => setPage((prev) => prev - 1)}>
            <ArrowCircleUp />
          </IconButton>
        )}
      </Stack>
    </Accordion>
  );
}
