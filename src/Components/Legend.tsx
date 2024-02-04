import { FaSpotify } from "react-icons/fa";

export interface TracksSelectedProps {
  tracksSelected: boolean;
  logOut: () => void;
}

export const Legend = ({ tracksSelected, logOut }: TracksSelectedProps) => {
  return (
    <div className="legend-container">
      <h2>Receipt Explained</h2>
      {tracksSelected ? (
        <div>
          <p>
            <span>Qty</span> - The ranking of a track in your most played. The
            higher up on the list, the more played it is.
          </p>
          <p>
            <span>Amt</span> - The length of the song.
          </p>
        </div>
      ) : (
        <div>
          <p>
            <span>Qty</span> - The ranking of an artist in your most played. The
            higher up on the list, the more played it is.
          </p>
          <p>
            <span>Amt</span> - The popularity of an artist, from 0-100. 100 is
            the most popular, and 0 is the least popular.
          </p>
        </div>
      )}
      <button className="button logout" onClick={logOut}>
        Logout <FaSpotify />
      </button>
    </div>
  );
};
