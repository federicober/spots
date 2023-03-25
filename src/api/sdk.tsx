import axios, { AxiosError } from "axios";

import * as models from "./models";

export default class SpotifyApi {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
  private __headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  // ME
  async me() {
    const data = await axios.get(`https://api.spotify.com/v1/me`, {
      headers: this.__headers(),
    });
    return data.data as models.User;
  }

  async myFollowing() {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/following?type=artist",
      {
        headers: this.__headers(),
      }
    );
    return data.artists.items as models.Artist[];
  }

  async myTopTracks(term: models.Term = "medium_term") {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${term}`,
      {
        headers: this.__headers(),
      }
    );
    return data.items as models.Track[];
  }

  async myPlaylists() {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: this.__headers(),
      }
    );
    return data.items as models.PlaylistShort[];
  }

  // PLAYER
  async playTrack(track: models.Track, ...otherTracks: models.Track[]) {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          uris: [track, ...otherTracks].map((track_) => track_.uri),
        },
        {
          headers: this.__headers(),
        }
      );
    } catch (e) {
      const err = e as AxiosError;
      if (
        err.response !== undefined &&
        err.request.data.reason === "NO_ACTIVE_DEVICE"
      ) {
        return "NO_ACTIVE_DEVICE";
      } else {
        console.error(e);
      }
    }
  }
  async playContext(contextUri: string) {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri: contextUri,
        },
        {
          headers: this.__headers(),
        }
      );
    } catch (e) {
      const err = e as AxiosError;
      if (
        err.response !== undefined &&
        err.request.data.reason === "NO_ACTIVE_DEVICE"
      ) {
        return "NO_ACTIVE_DEVICE";
      } else {
        console.error(e);
      }
    }
  }

  // PLAYLIST
  async getPlaylist(playlistId: string) {
    const data = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: this.__headers(),
      }
    );
    return data.data as models.Playlist;
  }

  private async _getPlaylistTracks(
    playlistId: string,
    limit: number,
    offset: number
  ) {
    const data = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: this.__headers(),
        params: { limit: limit, offset: offset },
      }
    );
    return data.data.items as models.AddedTrack[];
  }

  async getPlaylistTracks(playlist: models.Playlist) {
    const pageSize = playlist.tracks.limit;
    const numPages = Math.floor(playlist.tracks.total / playlist.tracks.limit);

    const allTracks = await Promise.all(
      [...Array(numPages).keys()].map((page) =>
        this._getPlaylistTracks(
          playlist.id,
          playlist.tracks.limit,
          (page + 1) * pageSize
        )
      )
    );
    return [...playlist.tracks.items, ...allTracks.flat()];
  }

  async addItemsPlaylist(playlistId: string, tracks: models.Track[]) {
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        position: 0,
        uris: tracks.map((track) => track.uri),
      },
      {
        headers: this.__headers(),
      }
    );
  }

  // ARTIST
  async getArtist(artistId: string) {
    const data = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: this.__headers(),
      }
    );
    return data.data as models.Artist;
  }

  async artistTopTracks(artistId: string, market: string) {
    const data = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      {
        headers: this.__headers(),
        params: {
          market: market,
        },
      }
    );
    return data.data.tracks as models.Track[];
  }

  async artistRelatedArtists(artistId: string) {
    const data = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      {
        headers: this.__headers(),
      }
    );
    return data.data.artists as models.Artist[];
  }
}
