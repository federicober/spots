import { useState } from "react";

import { AddCircle, ExpandMore, RemoveCircle } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import { Artist, Track } from "../../api/models";
import useApi from "../../api/sdk";
import { H5, H6 } from "../../core/styled";
import { TrackListItem } from "../TrackListItem";

interface ArtistsTopTracksNavProps {
    artistsInPlaylist: Artist[];
    stageTrack: (track: Track) => void
    isTrackAdded: (track: Track) => boolean
}

export default function ArtistsTopTracksNav({ artistsInPlaylist, stageTrack, isTrackAdded }: ArtistsTopTracksNavProps) {
    const STEP = 5;

    const api = useApi();

    const [numArtists, setNumArtists] = useState<number>(5);
    const [artistTopTracks, setArtistTopTracks] = useState<Record<string, Track[]>>({});

    const artists = artistsInPlaylist;

    async function loadArtistsTopTracks(artist: Artist) {
        if (artist.id in artistTopTracks) return
        const tracks = await api.artistTopTracks(artist.id, "FR");
        setArtistTopTracks(prevRecord => (
            { ...prevRecord, [artist.id]: tracks }
        ));
    }

    return <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
            <H5>
                Artist top tracks
            </H5>
        </AccordionSummary>
        <AccordionDetails>
            {artists.slice(0, numArtists).map(artist => {
                const artistTracks = (artistTopTracks[artist.id] || []).filter(
                    track => !isTrackAdded(track)
                )
                return <Accordion key={artist.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        onClick={() => loadArtistsTopTracks(artist)}
                    >
                        <H6>
                            {artist.name}
                        </H6>
                    </AccordionSummary>
                    <AccordionDetails>
                        {artistTracks.length > 0 ?
                            artistTracks.map(
                                track => <TrackListItem
                                    key={track.id}
                                    track={track}
                                    playable={true}
                                    onAdd={() => stageTrack(track)}
                                />
                            )
                            :
                            <Typography color="grey" >All songs are in playlist</Typography>
                        }
                    </AccordionDetails>
                </Accordion>
            })}
        </AccordionDetails>
        <Stack direction="row" justifyContent="center">
            {numArtists < artists.length &&
                <Tooltip title="See more artists">
                    <IconButton onClick={() => setNumArtists(prev => prev + STEP)}>
                        <AddCircle />
                    </IconButton>
                </Tooltip>
            }
            {numArtists > STEP &&
                <IconButton onClick={() => setNumArtists(prev => prev - STEP)}>
                    <RemoveCircle />
                </IconButton>
            }
        </Stack>
    </Accordion>;
}
