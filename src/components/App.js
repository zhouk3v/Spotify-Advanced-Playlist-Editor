import React, { useContext } from "react";
import localforage from "localforage";

import { CLIENT_ID, REDIRECT_URI } from "../API/api";

import Login from "./Login";

import Editor from "./Editor";

import AuthContext from "../context/auth-context";

const authEndpoint = "https://accounts.spotify.com/authorize";

const scopes = [
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-private",
  "user-read-email",
];

const logout = async () => {
  localStorage.clear();
  await localforage.clear();
  window.location.reload();
};

const App = () => {
  const ctx = useContext(AuthContext);

  const { token, validState, urlState, codeChallenge, isRedirect } = ctx;

  return (
    <div>
      {!validState && <p>ERROR: received invalid state from Spotify API</p>}
      {validState && !token && isRedirect && <p>Loading</p>}
      {validState && !token && !isRedirect && (
        <Login
          authEndpoint={authEndpoint}
          clientId={CLIENT_ID}
          redirectUri={REDIRECT_URI}
          urlState={urlState}
          codeChallenge={codeChallenge}
          scopes={scopes}
        />
      )}
      {validState && token && <Editor logout={logout} />}
    </div>
  );
};

export default App;
