import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import useApi from "../api";
import { Track } from "../api/models";

interface TrackListItemProps {
  track: Track;
  onAdd?: (track: Track) => void;
  onRemove?: (track: Track) => void;
  playable?: boolean;
}

export function TrackListItem({
  track,
  onAdd,
  onRemove,
  playable,
}: TrackListItemProps) {
  const api = useApi();
  const artistName = track.artists[0]?.name || "Unknown";
  const albumUrl = track.album.images[0]?.url || "no";

  return (
    <ListItem sx={{ pr: 4, pl: 4 }}>
      <Avatar variant="rounded" src={albumUrl} sx={{ marginRight: 4 }} />
      <Typography>
        <b>{track.name}</b> by {artistName}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ marginLeft: "auto" }}
        spacing={3}
      >
        {onAdd !== undefined && (
          <IconButton
            sx={{ margin: 0, padding: 0 }}
            onClick={() => onAdd(track)}
          >
            <Add />
          </IconButton>
        )}
        {onRemove !== undefined && (
          <IconButton
            sx={{ margin: 0, padding: 0 }}
            onClick={() => onRemove(track)}
          >
            <Remove />
          </IconButton>
        )}
        {playable === true && (
          <IconButton
            sx={{ margin: 0, padding: 0 }}
            onClick={() => api.playTrack(track)}
          >
            <PlayArrow />
          </IconButton>
        )}
      </Stack>
    </ListItem>
  );
}
