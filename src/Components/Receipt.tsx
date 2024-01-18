import { Loading } from "./Loading";
import { useEffect, useCallback, useState } from "react";
import axios from "axios";

export const Receipt = ({ receiptData }) => {
  const [userName, setUserName] = useState<string>("");

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate = new Date().toLocaleDateString("en-US", options);

  const generateRandomNumber = (numDigits: number): number => {
    const min = Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const returnTimeRange = (receiptData): string => {
    switch (true) {
      case receiptData.href.includes("short_term"):
        return "Last Month";
      case receiptData.href.includes("long_term"):
        return "All Time";
      default:
        return "Last 6 Months";
    }
  };

  const formatTimeFromSeconds = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString()}:${secs.toString().padStart(2, "0")}`;
  };

  const addTotalTime = (receiptData): string => {
    const totalMilliseconds = receiptData.items.reduce(
      (accumulator, item) => accumulator + item.duration_ms,
      0
    );
    return formatTimeFromSeconds(totalMilliseconds);
  };

  const getUserName = useCallback(async () => {
    const token = window.localStorage.getItem("token");
    const data = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserName(data.data.display_name);
  }, []);

  useEffect(() => {
    getUserName();
  }, [getUserName]);

  return !receiptData.items ? (
    <Loading />
  ) : (
    <div className="receipt-container">
      <h3>Spotify Receipt</h3>
      <p>{returnTimeRange(receiptData)}</p>
      <p>
        Order #{generateRandomNumber(5)} for {userName}
      </p>
      <p>{currentDate}</p>
      <table>
        <thead>
          <tr>
            <td>Qty</td>
            <td>Item</td>
            <td>Amt</td>
          </tr>
        </thead>
        <tbody>
          {receiptData.items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1 <= 9 ? `0${index + 1}` : index + 1}</td>
              <td>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.external_urls.spotify}
                >
                  {item.name} -{" "}
                  {item.artists.map((artistInfo) => artistInfo.name).join(", ")}
                </a>
              </td>
              <td>{formatTimeFromSeconds(item.duration_ms)}</td>
            </tr>
          ))}
        </tbody>
        <tr>
          <td>Item Count:</td>
          <td>{receiptData.items.length}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>{addTotalTime(receiptData)}</td>
        </tr>
        <div className="card-info-container">
          <p>Card #: **** **** **** {generateRandomNumber(4)}</p>
          <p>Auth Code: {generateRandomNumber(5)}</p>
          <p>Card: {userName}</p>
        </div>
        <div className="barcode-container">
          <p>Thank you for visiting!</p>
          <img
            src="https://receiptify.herokuapp.com/barcode.png"
            alt="A barcode"
          />
          <p>spotifyreceipts.com</p>
          <img
            src="https://receiptify.herokuapp.com/assets/img/Spotify_Logo_RGB_Black.png"
            alt="Spotify"
          />
        </div>
      </table>
    </div>
  );
};
