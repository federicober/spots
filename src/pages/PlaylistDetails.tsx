import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  List,
  IconButton,
  Button,
  Stack,
  Divider,
  Input,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import useApi from "../api";
import { H4, Item } from "../core/styled";
import { Track, Playlist } from "../api/models";
import { TrackListItem } from "../components/TrackListItem";
import RecommendationNav from "../components/RecommendationNav";

interface TracksTitleProps {
  onChange: (value: string) => void;
}

function TracksTitle({ onChange }: TracksTitleProps) {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  return (
    <>
      <Stack direction="row">
        <H4
          sx={{
            margin: "auto",
          }}
        >
          Tracks
        </H4>
        <IconButton onClick={() => setSearchOpen((prev) => !prev)}>
          <Search />
        </IconButton>
      </Stack>
      {searchOpen && (
        <Stack>
          <Input
            placeholder="Track Name"
            sx={{ width: "50%", marginLeft: "auto" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value.toLowerCase())
            }
          />
        </Stack>
      )}
    </>
  );
}

export default function PlaylistDetails() {
  const api = useApi();

  const { playlistId } = useParams<{ playlistId: string }>() as Record<
    string,
    string
  >;

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [stagedTracks, setStagedTracks] = useState<Track[]>([]);
  const [searchedTrack, setSearchedTrack] = useState<string>("");

  function isTrackAdded(track: Track) {
    return Boolean(
      tracks.find((playlistTrack) => track.id === playlistTrack.id) ||
        stagedTracks.find((playlistTrack) => track.id === playlistTrack.id)
    ).valueOf();
  }
  function stageTrack(track: Track) {
    setStagedTracks((prevStagedTracks) => [...prevStagedTracks, track]);
  }
  function unstageTrack(track: Track) {
    setStagedTracks((prevStagedTracks) =>
      prevStagedTracks.filter((prevTrack) => prevTrack.id !== track.id)
    );
  }

  async function saveChanges() {
    await api.addItemsPlaylist(playlistId, stagedTracks);
    setTracks((prevTracks) => [...stagedTracks, ...prevTracks]);
    setStagedTracks([]);
  }
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
        if (playlist.tracks.total <= playlist.tracks.limit) {
          setTracks(
            playlist.tracks.items.map((addedtrack) => addedtrack.track)
          );
        } else {
          // TODO
          setTracks(
            playlist.tracks.items.map((addedtrack) => addedtrack.track)
          );
          console.error("Missing tracks");
        }
      }
    }
    fetchData();
  }, [playlist]);

  if (playlist === null) return <></>;

  return (
    <>
      <Stack
        spacing={10}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ margin: "auto" }}
        >
          <Typography variant="h3">{playlist.name}</Typography>
          <Typography>by {playlist.owner.display_name}</Typography>
        </Stack>
        {stagedTracks.length > 0 && (
          <Button variant="contained" onClick={saveChanges}>
            Save
          </Button>
        )}
      </Stack>
      <Divider sx={{ marginTop: 8, marginBottom: 8 }} />
      <Stack spacing={10} direction={{ sm: "column", md: "row" }}>
        <RecommendationNav
          tracks={tracks}
          isTrackAdded={isTrackAdded}
          stageTrack={stageTrack}
        />
        <Item>
          <TracksTitle onChange={setSearchedTrack} />
          <Divider sx={{ marginTop: 4, marginBottom: 4 }} />
          <List>
            {stagedTracks.map((track) => (
              <TrackListItem
                key={track.id}
                track={track}
                onRemove={() => unstageTrack(track)}
              />
            ))}
            {tracks
              .sort((a, b) =>
                b.artists[0].name.localeCompare(a.artists[0].name)
              )
              .filter((track) =>
                track.name.toLowerCase().includes(searchedTrack)
              )
              .map((track) => (
                <TrackListItem key={track.id} track={track} playable={true} />
              ))}
          </List>
        </Item>
      </Stack>
    </>
  );
}
