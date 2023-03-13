import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

import { Artist } from "../api/models";

interface ArtistCardProps {
  artist: Artist;
  size: number;
}

export default function ArtistCard({ artist, ...props }: ArtistCardProps) {
  return (
    <Link
      to={`artist/${artist.id}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <Card
        sx={{
          width: props.size,
          marginRight: 2,
          flex: "0 0 auto",
        }}
      >
        <CardHeader title={artist.name} subheader={artist.genres[0]} />
        {artist.images.length > 0 && (
          <CardMedia
            component="img"
            image={artist.images[0].url}
            alt={artist.name}
            height="300"
          />
        )}
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Popularity: {artist.popularity}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
}
