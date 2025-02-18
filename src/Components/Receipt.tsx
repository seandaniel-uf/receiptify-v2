// dependencies
import { useEffect, useCallback, useState, useMemo, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";

// components
import { Loading } from "./Loading";

// utils
import {
  currentDate,
  generateRandomNumber,
  returnTimeRange,
  formatTimeFromMilliseconds,
  addTotal,
} from "../utils.ts";

// assets
import Barcode from "/assets/barcode.png";
import SpotifyFull from "/assets/spotifyFull.png";
import SpotifyIcon from "/assets/spotifyIcon.svg";

// icons
import { FaDownload } from "react-icons/fa";
export interface ReceiptProps {
  href: string;
  items: {
    id: string;
    external_urls: {
      spotify: string;
    };
    name: string;
    artists?: { name: string }[];
    duration_ms?: number | null;
    popularity?: number;
  }[];
}

export const Receipt = ({ receiptData }: { receiptData: ReceiptProps }) => {
  const [userName, setUserName] = useState<string>("");
  const randomNumber4 = useMemo(() => generateRandomNumber(4), []);
  const randomNumber5 = useMemo(() => generateRandomNumber(5), []);
  const receiptRef = useRef<HTMLDivElement>(null);

  const getUserName = useCallback(async () => {
    const token = window.sessionStorage.getItem("token");
    const data = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserName(data.data.display_name);
  }, []);

  const downloadReceipt = () => {
    if (receiptRef.current) {
      html2canvas(receiptRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: true,
      }).then((canvas) => {
        const imageUrl = canvas.toDataURL("image/png");

        const timeRange = returnTimeRange(receiptData)
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace("_", "-");
        const isArtists = receiptData.items.some(
          (item) => !item.artists || item.artists.length === 0
        );
        const length = receiptData.items.length;

        const typeLength = isArtists
          ? `top-${length}-artists`
          : `top-${length}-tracks`;

        const fileName = `${typeLength}-${timeRange}-${userName
          .toLowerCase()
          .replace(/\s+/g, "-")}-receipt.png`;

        // Create a temporary link to trigger the download
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = fileName;
        link.click();
      });
    }
  };

  useEffect(() => {
    getUserName();
  }, [getUserName]);

  return !receiptData.items ? (
    <Loading />
  ) : (
    <>
      <div>
        <div className="receipt-container" ref={receiptRef}>
          <div className="receipt-title-subtitle-container">
            <h3>
              Receipt <img src={SpotifyIcon} alt="Spotify" />
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
                          (artistInfo: { name: string }) =>
                            `${artistInfo?.name}`
                        )
                        ?.join(", ")}
                    </a>
                  </td>
                  <td className="end">
                    {item.duration_ms
                      ? formatTimeFromMilliseconds(item.duration_ms)
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
            <img src={Barcode} alt="A barcode" className="barcode" />
            <p>receiptify-v2.netlify.app</p>
            <img src={SpotifyFull} alt="Spotify" className="spotify-logo" />
          </div>
        </div>
        <div className="button-container">
          <button className="button download" onClick={downloadReceipt}>
            Download <FaDownload />
          </button>
        </div>
      </div>
    </>
  );
};
