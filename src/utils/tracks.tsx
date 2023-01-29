import _ from "lodash";

import { Artist, Track } from "../api/models"

export function countArtists(tracks: Track[]) {
    const artistIdCount: Record<string, number> = {}
    const allArtists: Artist[] = []
    tracks.map(
        (track) => track.artists
    ).flat().forEach(
        (artist) => {
            if (artist.id in artistIdCount) {
                artistIdCount[artist.id] = ++artistIdCount[artist.id]
            }
            else {
                allArtists.push(artist)
                artistIdCount[artist.id] = 1
            }
        }
    )
    const orderedArtists = Object.entries(artistIdCount).sort(
        (a, b) => b[1] - a[1]
    ).map(
        ([artistId, count]) => allArtists.find((artist) => artist.id === artistId)
    )
    return _.compact(orderedArtists)
}