import { useState, useEffect } from "react";
import { Divider } from "@mui/material";

import HorizontalScroll from "../components/HorizontalScroll";
import { Artist, PlaylistShort } from "../api/models";
import useApi from "../api/sdk";
import PlaylistCard from "../components/PlaylistCard";
import ArtistCard from "../components/ArtistCard";

export default function Home() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistShort[]>([]);
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      setPlaylists(await api.myPlaylists());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setArtists(await api.myFollowing());
    };
    fetchData();
  }, []);

  return (
    <>
      {playlists.length > 0 && (
        <>
          <HorizontalScroll title="Playlists">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.uri} playlist={playlist} size={300} />
            ))}
          </HorizontalScroll>
        </>
      )}
      {artists.length > 0 && (
        <>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <HorizontalScroll title="Artists">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </HorizontalScroll>
        </>
      )}
    </>
  );
}
