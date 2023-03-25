import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import useApi from "../api";
import { Track, Artist } from "../api/models";
import TrackListItem from "../components/TrackListItem";
import ListItem from "@mui/material/ListItem";

export default function ArtistDetails() {
  const api = useApi();

  const { artistId } = useParams<{ artistId: string }>() as Record<
    string,
    string
  >;

  const [artist, setArtist] = useState<Artist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [relatedArtists, setRelatedArtists] = useState<Artist[]>([]);

  // load artist info from id
  useEffect(() => {
    const fetchData = async () => {
      setArtist(await api.getArtist(artistId));
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTracks() {
      if (artist !== null) {
        setTracks(await api.artistTopTracks(artist.id, "FR"));
      }
    }
    async function fetchRelated() {
      if (artist !== null) {
        setRelatedArtists(await api.artistRelatedArtists(artist.id));
      }
    }
    fetchTracks();
    fetchRelated();
  }, [artist]);

  if (artist === null) return <></>;

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ margin: "auto" }}
      >
        <Typography variant="h3">{artist.name}</Typography>
        <Typography>Popularity: {artist.popularity}</Typography>
      </Stack>
      <Divider sx={{ marginTop: 8, marginBottom: 8 }} />
      <Typography variant="h4">Top tracks</Typography>
      <List>
        {tracks.map((track) => (
          <TrackListItem key={track.id} track={track} playable={true} />
        ))}
      </List>
      <Divider sx={{ marginTop: 8, marginBottom: 8 }} />
      <Typography variant="h4">Related artists</Typography>
      <List>
        {relatedArtists.map((relatedArtist) => (
          <Link
            key={relatedArtist.id}
            to={`/artist/${relatedArtist.id}`}
            target="_blank" // TODO remove this when proper routing
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItem>{relatedArtist.name}</ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}
