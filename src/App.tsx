import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./index.scss";
// components
import { Header } from "./Components/Header";
import { Login } from "./Components/Login";
import { ReceiptFormContainer } from "./Components/ReceiptFormContainer";

// todo: LOADING STATE instead of checking receiptData in Receipt.tsx
// todo: API Error state
// todo: Form values update one late
// todo: Artists vs Tracks API call
// todo: Receipt helper functions in their own file

function App() {
  const [token, setToken] = useState<string | null>("");
  const [receiptData, setReceiptData] = useState([]);

  // on login
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const handleChange = useCallback(
    async ({
      type = "tracks",
      time_range = "short_term",
      limit = "10",
    } = {}) => {
      if (!token) {
        return;
      }
      try {
        const data = await axios.get(
          `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&offset=0&time_range=${time_range}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Handle the data as needed
        console.log(data.data);
        setReceiptData(data.data);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    },
    [token]
  );
  useEffect(() => {
    handleChange();
  }, [token, handleChange]);

  return (
    <div>
      <div className="wrapper">
        <Header title="Spotify Receipts" />
        <main>
          <Login isLoggedIn={token} />
          <ReceiptFormContainer
            isLoggedIn={token}
            handleFormUpdate={handleChange}
            receiptData={receiptData}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
