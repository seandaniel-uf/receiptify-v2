import { FaSpotify } from "react-icons/fa";
import Receipt from "/assets/receipt.png";

export const Login = () => {
  const CLIENT_ID = "b0bcfd9d4f2345039350ddf256441f65";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  return (
    <section className="login-container">
      <div className="img-info-container">
        <img src={Receipt} alt="A receipt with a list of songs" />
      </div>
      <div className="login-disclaimer-description-container">
        <p>
          Generate music receipts showcasing your favourite tracks and artists
          on Spotify.
        </p>
        <p>
          Download your receipt and share with your friends and let them be the
          judge of your music taste.
        </p>
        <a
          className="button"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-top-read&response_type=${RESPONSE_TYPE}`}
        >
          Login
          <FaSpotify />
        </a>
        <p>🔒 Authenticate safely with Spotify’s official login.</p>
      </div>
    </section>
  );
};
