const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_OAUTH_REDICT_URI;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = [
  "user-modify-playback-state",
  "user-follow-read",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-top-read",
];

export const LOGIN_URL =
  `${AUTH_ENDPOINT}` +
  `?client_id=${encodeURIComponent(CLIENT_ID)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=${encodeURIComponent(RESPONSE_TYPE)}` +
  `&scope=${encodeURIComponent(SCOPES.join(" "))}`;
