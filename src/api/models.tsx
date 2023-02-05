export type ExternalUrls = Map<string, string>;
export type ExternalIds = Map<string, string>;

export type Term = "medium_term" | "long_term" | "short_term";

interface Resource {
  href: string;
  type: string;
  uri: string;
  external_urls: ExternalUrls;
  id: string;
}
export interface Image {
  length: number;
  url: string;
}
export interface Followers {
  href: string | null;
  total: number;
}
export interface Artist extends Resource {
  images: Image[];
  name: string;
  genres: string[];
  popularity: number;
}
export interface User extends Resource {
  display_name: string;
}
export interface Album extends Resource {
  total_tracks: number;
  release_date: string;
  release_date_precision: string;
  name: string;
  images: Image[];
  album_type: string;
  artists: Artist[];
  available_market: string[];
}
export interface Track extends Resource {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIds;
  is_local: false;
  name: string;
  popularity: number;
  preview_url: string | null;
  track: boolean;
  track_number: number;
  images: Image[];
}
export interface AddedTrack {
  added_at: string;
  added_by: User;
  is_local: boolean;
  primary_color: undefined;
  track: Track;
}
export interface TrackRef {
  href: string;
  total: number;
}
export interface PlaylistTracks extends TrackRef {
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
  items: AddedTrack[];
}
export interface PlaylistShort extends Resource {
  collaborative: boolean;
  description: string;
  images: Image[];
  owner: User;
  name: string;
  primary_color: unknown | null;
  public: boolean;
  snapshot_id: string;
  tracks: TrackRef;
}
export interface Playlist extends PlaylistShort {
  tracks: PlaylistTracks;
}
