// todo: FEATURE: Download Receipt
// todo: FEATURE: Save as Playlist
// todo: FEATURE: Open Receipt in New Tab
// todo: BUG: Song name width - 10 to 50
// todo: Test Coverage 100%
// todo: API Error states
// todo: BUG: punycode module deprecated

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./index.scss";

import { type ReceiptProps } from "./Components/Receipt";
// components
import { Header } from "./Components/Header";
import { Login } from "./Components/Login";
import { ReceiptFormContainer } from "./Components/ReceiptFormContainer";

function App() {
  const [token, setToken] = useState<string | null>("");
  const [receiptData, setReceiptData] = useState<ReceiptProps>({
    href: "",
    items: [],
  });

  const handleLogin = () => {
    // if previous user, grab access_token
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem("token");

    // if new user, create an access_token
    if (!token && hash) {
      // @ts-expect-error: Object is possibly 'null'.
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.sessionStorage.setItem("token", token);
    }

    setToken(token);
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem("token");
    setToken("");
  };

  // on form change
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
        const response = await axios.get<ReceiptProps>(
          `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&offset=0&time_range=${time_range}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReceiptData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [token]
  );

  useEffect(() => {
    handleLogin();
    handleChange();
  }, [token, handleChange]);

  return (
    <>
      <Header title="Receiptify" subTitle="Top Music Generator" />
      <div className="wrapper">
        <main>
          {!token && <Login />}
          <ReceiptFormContainer
            isLoggedIn={token}
            handleFormUpdate={handleChange}
            receiptData={receiptData}
            logOut={handleLogout}
          />
        </main>
      </div>
    </>
  );
}

export default App;
