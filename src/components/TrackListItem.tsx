import {
    Typography,
    ListItem,
    Avatar,
    IconButton,
    Stack
} from "@mui/material";
import { Add, Remove, PlayArrow } from "@mui/icons-material";

import useApi from "../api/sdk";
import { Track } from "../api/models";

interface TrackListItemProps {
    track: Track;
    onAdd?: (track: Track) => void;
    onRemove?: (track: Track) => void;
    playable?: boolean;
}

export function TrackListItem({ track, onAdd, onRemove, playable }: TrackListItemProps) {
    const api = useApi();

    return <ListItem sx={{ pr: 4, pl: 4 }}>
        <Avatar
            variant="rounded"
            src={track.album.images[0].url}
            sx={{ marginRight: 4 }} />
        <Typography>
            <b>{track.name}</b> by {track.artists[0].name}
        </Typography>
        <Stack
            direction="row"
            alignItems="center"
            sx={{ marginLeft: "auto" }}
            spacing={3}
        >
            {onAdd !== undefined &&
                <IconButton sx={{ margin: 0, padding: 0 }} onClick={() => onAdd(track)}>
                    <Add />
                </IconButton>}
            {onRemove !== undefined &&
                <IconButton sx={{ margin: 0, padding: 0 }} onClick={() => onRemove(track)}>
                    <Remove />
                </IconButton>}
            {playable === true &&
                <IconButton sx={{ margin: 0, padding: 0 }} onClick={() => api.playTrack(track)}>
                    <PlayArrow />
                </IconButton>}
        </Stack>
    </ListItem>
}
