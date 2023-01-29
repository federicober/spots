import { Track } from "../../api/models";



export interface Suggestion {
    title: string;
    tracks: Track[];
}

export interface LazySuggestion {
    title: string;
    fetchTracks: Promise<Track[]>;
}

async function loadSuggestion(lazy: LazySuggestion) {
    return { title: lazy.title, tracks: await lazy.fetchTracks };
}
export type Suggestions = Record<string, Suggestion>;
