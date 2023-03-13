import { PlaylistShort } from "../api/models";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface PlaylistCardProps {
  playlist: PlaylistShort;
  size: number;
}

export default function PlaylistCard({
  playlist,
  ...props
}: PlaylistCardProps) {
  return (
    <Link
      to={`playlist/${playlist.id}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Card
        sx={{
          width: props.size,
          marginRight: 2,
          flex: "0 0 auto",
        }}
      >
        <CardHeader
          title={playlist.name}
          subheader={`Tracks: ${playlist.tracks.total}`}
        />
        {playlist.images.length > 0 && (
          <CardMedia
            component="img"
            image={playlist.images[0].url}
            alt={playlist.name}
            height={props.size}
          />
        )}
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            By: {playlist.owner.display_name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </Link>
  );
}