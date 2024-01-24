import { useEffect, useCallback, useState, useMemo } from "react";
import axios from "axios";
import { FaSpotify } from "react-icons/fa";

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
  const randomNumber4 = useMemo(() => generateRandomNumber(4), []);
  const randomNumber5 = useMemo(() => generateRandomNumber(5), []);

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
      <div className="receipt-title-subtitle-container">
        <h3>
          Receipt <FaSpotify />
        </h3>
        <p>{returnTimeRange(receiptData)}</p>
      </div>
      <div className="order-number-date-container">
        <p>
          Order #{randomNumber5} for {userName}
        </p>
        <p>{currentDate}</p>
      </div>
      <table>
        <thead>
          <tr>
            <td className="begin">Qty</td>
            <td>Item</td>
            <td className="end">Amt</td>
          </tr>
        </thead>
        <tbody>
          {receiptData.items.map((item, index) => (
            <tr key={item.id}>
              <td className="begin">
                {index + 1 <= 9 ? `0${index + 1}` : index + 1}
              </td>
              <td className="name">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.external_urls.spotify}
                >
                  {item.name}
                  {item.artists && " - "}
                  {item.artists
                    ?.map(
                      (artistInfo: { name: string }) => `${artistInfo?.name}`
                    )
                    ?.join(", ")}
                </a>
              </td>
              <td className="end">
                {item.duration_ms
                  ? formatTimeFromSeconds(item.duration_ms)
                  : item.popularity}
              </td>
            </tr>
          ))}
          <tr className="item-count">
            <td className="begin" colSpan={2}>
              Item Count:
            </td>
            <td className="end">{receiptData.items.length}</td>
          </tr>
          <tr className="total-count">
            <td className="begin" colSpan={2}>
              Total:
            </td>
            <td className="end">{addTotal(receiptData)}</td>
          </tr>
        </tbody>
      </table>
      <div className="card-info-container">
        <p>Card #: **** **** **** {randomNumber4}</p>
        <p>Auth Code: {randomNumber5}</p>
        <p>Cardholder: {userName}</p>
      </div>
      <div className="barcode-container">
        <p className="thank-you-text">Thank you for visiting!</p>
        <img
          src="https://receiptify.herokuapp.com/barcode.png"
          alt="A barcode"
          className="barcode"
        />
        <p>spotifyreceipts.com</p>
        <img
          src="https://receiptify.herokuapp.com/assets/img/Spotify_Logo_RGB_Black.png"
          alt="Spotify"
          className="spotify-logo"
        />
      </div>
    </div>
  );
};
