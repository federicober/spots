import React, { useState } from "react";

import Search from "@mui/icons-material/Search";
import Save from "@mui/icons-material/Save";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";
import Pagination from "@mui/material/Pagination";

import useApi from "../../api";
import { H4, Item } from "../../core/styled";
import { Track, Playlist } from "../../api/models";
import TrackListItem from "../../components/TrackListItem";
import RecommendationNav from "./RecommendationNav";

interface TracksTitleProps {
  onSearchChange: (value: string) => void;
  onSave: () => void;
  needsSave: boolean;
}

function TracksTitle({ onSearchChange, onSave, needsSave }: TracksTitleProps) {
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
        {needsSave && (
          <IconButton onClick={onSave}>
            <Save />
          </IconButton>
        )}
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
              onSearchChange(e.target.value.toLowerCase())
            }
          />
        </Stack>
      )}
    </>
  );
}

const TRACKS_PER_PAGE = 10;

interface PlaylistRecommendationsProps {
  playlist: Playlist;
  tracks: Track[];
  addTracks: (tracks: Track[]) => void;
}
export default function PlaylistRecommendations({
  playlist,
  tracks,
  addTracks,
}: PlaylistRecommendationsProps) {
  const api = useApi();

  const [stagedTracks, setStagedTracks] = useState<Track[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [page, setPage] = useState<number>(1);

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
    await api.addItemsPlaylist(playlist.id, stagedTracks);
    addTracks(stagedTracks);
    setStagedTracks([]);
  }

  function isSearched(track: Track) {
    return track.name.toLowerCase().includes(searchKey);
  }
  function onSearchChange(searchString: string) {
    setSearchKey(searchString);
    setPage(1);
  }

  const sortedTracks = tracks.sort((a, b) =>
    a.artists[0].name.localeCompare(b.artists[0].name)
  );
  const searchedTracks = sortedTracks.filter(isSearched);
  const totalPages = Math.floor(searchedTracks.length / TRACKS_PER_PAGE);

  return (
    <Stack spacing={10} direction={{ sm: "column", md: "row" }}>
      <RecommendationNav
        tracks={tracks}
        isTrackAdded={isTrackAdded}
        stageTrack={stageTrack}
      />
      <Item
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TracksTitle
          onSearchChange={onSearchChange}
          onSave={saveChanges}
          needsSave={stagedTracks.length > 0}
        />
        <Divider sx={{ marginTop: 4, marginBottom: 4 }} />
        <List>
          {stagedTracks.map((track) => (
            <TrackListItem
              key={track.id}
              track={track}
              onRemove={() => unstageTrack(track)}
            />
          ))}
          {searchedTracks
            .slice((page - 1) * TRACKS_PER_PAGE, page * TRACKS_PER_PAGE)
            .map((track) => (
              <TrackListItem key={track.id} track={track} playable={true} />
            ))}
        </List>
        <Pagination
          count={totalPages}
          variant="outlined"
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            setPage(value)
          }
          sx={{ m: "auto", mt: 2 }}
        />
      </Item>
    </Stack>
  );
}
