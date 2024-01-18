export interface TracksSelectedProps {
  tracksSelected: boolean;
}

export const Legend = ({ tracksSelected }: TracksSelectedProps) => {
  return (
    <div className="legend-container">
      <h2>Receipt Explained</h2>
      {tracksSelected ? (
        <div>
          <p>
            QTY - The ranking of a track in your most played. The higher up on
            the list, the more played it is.
          </p>
          <p>AMT - The length of the song</p>
        </div>
      ) : (
        <div>
          <p>
            QTY - The ranking of an artist in your most played. The higher up on
            the list, the more played it is.
          </p>
          <p>
            AMT - The popularity of an artist, from 0-100. 100 is the most
            popular, and 0 is the least popular.
          </p>
        </div>
      )}
    </div>
  );
};
