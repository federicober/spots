import { CollectionsOutlined } from '@mui/icons-material';
import axios, { AxiosError } from 'axios';
import { createContext, useContext } from "react";

import { Artist, PlaylistShort, Playlist, Track, User } from "./models";

export class SpotifyApi {
    token: string

    constructor(token: string) {
        this.token = token
    }
    __headers = () => {
        return {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    }
    searchArtists = async (artist: string) => {
        const { data } = await axios.get(
            "https://api.spotify.com/v1/search",
            {
                headers: this.__headers(),
                params: {
                    q: artist,
                    type: "artist"
                }
            }
        )

        return data.artists.items as Artist[]
    }

    myFollowing = async () => {
        const { data } = await axios.get(
            "https://api.spotify.com/v1/me/following?type=artist",
            {
                headers: this.__headers()
            }
        )
        return data.artists.items as Artist[]
    }

    myTopTracks = async (
        term: "medium_term" | "long_term" | "short_term" = "medium_term"
    ) => {
        const { data } = await axios.get(
            `https://api.spotify.com/v1/me/top/tracks?time_range=${term}`,
            {
                headers: this.__headers()
            }
        )
        return data.items as Track[]
    }

    myPlaylists = async () => {
        const { data } = await axios.get(
            "https://api.spotify.com/v1/me/playlists",
            {
                headers: this.__headers()

            }
        )
        return data.items as PlaylistShort[]
    }

    getPlaylist = async (playlistId: string) => {
        const data = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}`,
            {
                headers: this.__headers()
            }
        )
        return data.data as Playlist
    }

    artistTopTracks = async (artistId: string, market: string) => {
        const data = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
            {
                headers: this.__headers(),
                params: {
                    market: market,
                }
            }
        )
        return data.data.tracks as Track[]
    }

    playTrack = async (track: Track) => {
        try {
            const data = await axios.put(
                `https://api.spotify.com/v1/me/player/play`,
                {
                    uris: [track.uri]
                },
                {
                    headers: this.__headers()
                }
            )
        }
        catch (e) {
            const err = e as AxiosError
            if (err.response !== undefined && err.request.data.reason === "NO_ACTIVE_DEVICE") {
                return "NO_ACTIVE_DEVICE"
            }
            else {
                console.error(e)
            }
        }
    }
    me = async () => {
        const data = await axios.get(
            `https://api.spotify.com/v1/me`,
            {
                headers: this.__headers()
            },
        )
        return data.data as User
    }
    addItemsPlaylist = async (playlistId: string, tracks: Track[]) => {
        const data = await axios.post(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                position: 0,
                uris: tracks.map(track => track.uri)
            },
            {
                headers: this.__headers()
            },
        )
    }
}

export const ApiContext = createContext(new SpotifyApi(""))

export default function useApi() {
    return useContext(ApiContext)
}