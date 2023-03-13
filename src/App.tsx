import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import { ApiProvider } from "./api/provider";
import Header from "./components/Header";
import Home from "./pages/Home";
import PlaylistDetails from "./pages/PlaylistDetails";
import ArtistDetails from "./pages/ArtistDetails";

const RouterClass = HashRouter;

function App() {
  const [token, setToken] = useState<string | null>(null);

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("token");
  };

  const theme = createTheme({
    spacing: 2,
  });

  useEffect(() => {
    const hash = window.location.hash;
    let tokenCandidate = window.localStorage.getItem("token");

    if (!tokenCandidate && hash) {
      const queryParam = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"));
      if (queryParam === undefined) throw "hash does not contain access_token";
      tokenCandidate = queryParam.split("=")[1];

      window.location.hash = "/";
      window.localStorage.setItem("token", tokenCandidate);
    }

    setToken(tokenCandidate);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header loggedIn={token !== null} onLogout={logout} />
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
