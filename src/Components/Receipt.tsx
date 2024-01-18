import { useEffect, useCallback, useState } from "react";
import axios from "axios";

// components
import { Loading } from "./Loading";

// utils
import {
  currentDate,
  generateRandomNumber,
  returnTimeRange,
  formatTimeFromSeconds,
  addTotal,
} from "../utils.ts";

export interface ReceiptProps {
  href: string;
  items: {
    id: string;
    external_urls: {
      spotify: string;
    };
    name: string;
    artists?: { name: string }[];
    duration_ms?: number;
    popularity?: number;
  }[];
}

export const Receipt = ({ receiptData }: { receiptData: ReceiptProps }) => {
  const [userName, setUserName] = useState<string>("");

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
                  {item.name}
                  {item.artists
                    ?.map(
                      (artistInfo: { name: string }) => ` - ${artistInfo?.name}`
                    )
                    ?.join(", ")}
                </a>
              </td>
              <td>
                {item.duration_ms
                  ? formatTimeFromSeconds(item.duration_ms)
                  : item.popularity}
              </td>
            </tr>
          ))}
        </tbody>
        <tr>
          <td>Item Count:</td>
          <td>{receiptData.items.length}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>{addTotal(receiptData)}</td>
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
