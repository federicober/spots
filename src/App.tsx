import { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import { ApiContext, SpotifyApi } from './api/sdk';
import Home from './pages/Home';
import PlaylistDetails from './pages/PlaylistDetails';
import Header from './components/Header';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}></Route>
      <Route path="playlist/:playlistId" element={<PlaylistDetails />} />
    </>
  )
);

function App() {
  const [token, setToken] = useState<string | null>(null)

  const logout = () => {
    setToken(null)
    window.localStorage.removeItem("token")
  }

  const theme = createTheme({
    spacing: 2,
  });

  useEffect(() => {
    const hash = window.location.hash
    let tokenCandidate = window.localStorage.getItem("token")

    if (!tokenCandidate && hash) {
      const queryParam = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))
      if (queryParam === undefined) throw "hash does not contain access_token"
      tokenCandidate = queryParam.split("=")[1]

      window.location.hash = "/home"
      window.localStorage.setItem("token", tokenCandidate)
    }

    setToken(tokenCandidate)

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Header loggedIn={token !== null} onLogout={logout} />
      {token !== null &&
        <ApiContext.Provider value={new SpotifyApi(token)}>
          <RouterProvider router={router} />
        </ApiContext.Provider>
      }
    </ThemeProvider>
  )
}

export default App
