import { FaSpotify } from "react-icons/fa";

export const Login = () => {
  const CLIENT_ID = "b0bcfd9d4f2345039350ddf256441f65";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  return (
    <section className="login-container">
      <a
        className="button"
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-top-read&response_type=${RESPONSE_TYPE}`}
      >
        Login to Spotify <FaSpotify />
      </a>
    </section>
  );
};
