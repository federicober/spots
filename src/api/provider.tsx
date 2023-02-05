import { createContext, useContext } from "react";
import CachedSpotifyApi from "./client";

const ApiContext = createContext(new CachedSpotifyApi(""));

interface ApiContextProviderProps {
  token: string;
}
export function ApiProvider({
  token,
  children,
}: React.PropsWithChildren<ApiContextProviderProps>) {
  return (
    <ApiContext.Provider value={new CachedSpotifyApi(token)}>
      {children}
    </ApiContext.Provider>
  );
}

export default function useApi() {
  return useContext(ApiContext);
}
