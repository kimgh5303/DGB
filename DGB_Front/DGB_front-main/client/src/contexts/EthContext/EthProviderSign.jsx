/* eslint-disable */
import React, { useEffect, useState } from "react";
import EthContext from "./EthContext";

function EthProviderSign({ children }) {
  const [nowAddr, setNowAddr] = useState(null);

  // 메타마스크 아이디 받아오기
  useEffect(() => {
    async function getAccount() {
      if (window.ethereum) {
        try {
          // Request account access
          const accounts = await window.ethereum.enable();
          setNowAddr(accounts[0]);
        } catch (error) {
          console.error("User denied account access...");
        }
      }
    }

    getAccount();
  }, [])
  return (
    <EthContext.Provider value={{ nowAddr }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProviderSign;