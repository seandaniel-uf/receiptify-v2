import { FaSpotify } from "react-icons/fa";

export const Loading = () => {
  return (
    <div className="loading-container" data-testid="sr-loading">
      <FaSpotify />
      <p>Loading...</p>
    </div>
  );
};
