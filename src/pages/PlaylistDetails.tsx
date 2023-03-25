import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import PlayArrow from "@mui/icons-material/PlayArrow";

import useApi from "../api";
import { Track, Playlist } from "../api/models";
import PlaylistRecommendations from "../components/PlaylistRecommendations";

export default function PlaylistDetails() {
  const api = useApi();

  const { playlistId } = useParams<{ playlistId: string }>() as Record<
    string,
    string
  >;

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  // load Playlist info from id
  useEffect(() => {
    const fetchData = async () => {
      setPlaylist(await api.getPlaylist(playlistId));
    };
    fetchData();
  }, []);

  // get all playlist tracks
  useEffect(() => {
    async function fetchData() {
      if (playlist !== null) {
        setTracks(
          (await api.getPlaylistTracks(playlist)).map(
            (addedtrack) => addedtrack.track
          )
        );
      }
    }
    fetchData();
  }, [playlist]);

  if (playlist === null) return <></>;

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ margin: "auto" }}
      >
        <Typography variant="h3">{playlist.name}</Typography>
        <Typography>by {playlist.owner.display_name}</Typography>
        <IconButton onClick={() => api.playContext(playlist.uri)}>
          <PlayArrow />
        </IconButton>
      </Stack>
      <Divider sx={{ marginTop: 8, marginBottom: 8 }} />
      <PlaylistRecommendations
        playlist={playlist}
        tracks={tracks}
        addTracks={(tracks) =>
          setTracks((prevTracks) => [...tracks, ...prevTracks])
        }
      />
    </>
  );
}
