import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import { LOGIN_URL } from "./auth";
import { ApiProvider } from "./api/provider";
import Header from "./components/Header";
import Home from "./pages/Home";
import PlaylistDetails from "./pages/PlaylistDetails";
import ArtistDetails from "./pages/ArtistDetails";

const RouterClass = HashRouter;

interface LocalStorageToken {
  token: string;
  exp: number;
}

function App() {
  const [token, setToken] = useState<string | null>(null);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("auth:bearer_token");
  };

  const theme = createTheme({
    spacing: 2,
  });

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);

    const hash = window.location.hash.substring(1);

    // Because of weird router, search can end up in hash
    let search = window.location.search;
    if (hash.includes("access_token")) {
      search = "?" + hash;
    }
    const searchParams = new URLSearchParams(search);
    const tokenFromSearch = searchParams.get("access_token");

    // always use token from search if exists because more recent
    if (tokenFromSearch) {
      const exp = parseInt(searchParams.get("expires_in") || "3600") + now;
      window.localStorage.setItem(
        "auth:bearer_token",
        JSON.stringify({ token: tokenFromSearch, exp: exp })
      );
      setToken(tokenFromSearch);
      window.location.hash = "/";
    }
    const tokenFromLocalStorage: LocalStorageToken = JSON.parse(
      localStorage.getItem("auth:bearer_token") || "{}" // empty token
    );
    if (tokenFromLocalStorage.exp > now && tokenFromLocalStorage.token) {
      setToken(tokenFromLocalStorage.token);
      window.location.hash = "/";
    } else {
      window.location.href = LOGIN_URL;
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header onLogout={logout} />
      {token !== null && (
        <ApiProvider token={token}>
          <RouterClass>
            <Routes>
              <Route
                path="/playlist/:playlistId"
                element={<PlaylistDetails />}
              />
              <Route path="/artist/:artistId" element={<ArtistDetails />} />
              <Route path="/*" element={<Home />}></Route>
            </Routes>
          </RouterClass>
        </ApiProvider>
      )}
    </ThemeProvider>
  );
}

export default App;
