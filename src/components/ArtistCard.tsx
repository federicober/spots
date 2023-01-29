import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Artist } from "../api/models"

interface ArtistCardProps extends IconButtonProps {
    artist: Artist
}

export default function ArtistCard({ artist }: ArtistCardProps) {
    return (
        <Card sx={{ maxWidth: 400, marginRight: 2, flex: "0 0 auto" }}>
            <CardHeader
                title={artist.name}
                subheader={artist.genres[0]}
            />
            {artist.images.length > 0 &&
                <CardMedia
                    component="img"
                    image={artist.images[0].url}
                    alt={artist.name}
                    height="300"
                />
            }
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
        </Card >
    );
}