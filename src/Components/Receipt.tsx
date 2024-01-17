export const Receipt = ({ receiptData }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate = new Date().toLocaleDateString("en-US", options);

  console.log(receiptData.items);

  const generateRandom5DigitNumber = (): number => {
    return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  };

  const returnTimeRange = (receiptData): string => {
    if (receiptData?.href) {
      switch (true) {
        case receiptData.href.includes("short_term"):
          return "Last Month";
        case receiptData.href.includes("long_term"):
          return "All Time";
        default:
          return "Last 6 Months";
      }
    } else {
      return "";
    }
  };
  return (
    <div className="receipt-container">
      <h3>Spotify Receipt</h3>
      {receiptData?.items && (
        <>
          <p>{returnTimeRange(receiptData)}</p>
          <p>Order #{generateRandom5DigitNumber()} for **NAME**</p>
          <p>{currentDate}</p>
          <table>
            <thead>
              <tr>
                <td>QTY</td>
                <td>ITEM</td>
                <td>AMT</td>
              </tr>
            </thead>
            <tbody>
              {receiptData?.items.map((item, index) => (
                <tr key={item.id}>
                  <td>0{index + 1}</td>
                  <td>
                    <a target="_blank" href={item.external_urls.spotify}>
                      {item.name} -{" "}
                      {item.artists
                        .map((artistInfo) => artistInfo.name)
                        .join(", ")}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
