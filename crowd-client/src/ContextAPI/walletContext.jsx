import { createContext, useState, useEffect } from "react";
import axios from "axios";
import detectEthereumProvider from "@metamask/detect-provider";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const checkAndCreateAccount = async (walletId) => {
    try {
      const response = await axios.get(`/api/users?walletId=${walletId}`);
      if (response.status === 404) {
        const newUser = {
          walletId,
          firstName: "Default",
          lastName: "User",
          email: `${walletId}@example.com`,
          person: "Individual",
          skinTone: "Default",
          pose: "Default",
          gender: "Unknown",
          location: "Unknown",
        };

        await axios.post("/api/users", newUser);

        console.log("New account created for wallet:", walletId);
      } else if (!response.ok) {
        throw new Error("Error checking wallet account");
      }
    } catch (error) {
      console.error("Error checking/creating account:", error);
    }
  };

  // const connectWallet = async (e) => {
  //   e?.preventDefault();
  //   try {
  //     const provider = await detectEthereumProvider();

  //     if (!provider) {
  //       alert("MetaMask is not installed. Please install it to use the wallet.");
  //       return;
  //     }

  //     const accounts = await provider.request({ method: "eth_requestAccounts" });
  //     const walletId = accounts[0];

  //     setAccount(walletId);
  //     localStorage.setItem("account", walletId);
  //     setIsConnected(true);

  //     // Check and create account on the server
  //     await checkAndCreateAccount(walletId);
  //   } catch (error) {
  //     console.error("Error connecting wallet:", error);
  //   }
  // };

  const connectWallet = async (e) => {
    e.preventDefault();
  
    try {
      const provider = await detectEthereumProvider();
  
      if (!provider) {
        alert("MetaMask is not installed. Please install it to use the wallet.");
        return;
      }
  
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      const walletId = accounts[0];
  
      setAccount(walletId);
      localStorage.setItem("account", walletId);
      setIsConnected(true);
  
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/connect-wallet",
          { walletId }
        );
  
        if (response.status === 200) {
          const user = response.data;
          console.log("User connected:", user);
        } else {
          console.error("Error connecting wallet:", response.data);
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  

  const disconnectWallet = () => {
    localStorage.removeItem("account");
    setAccount(null);
    setIsConnected(false);
  };

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      setAccount(storedAccount);
      setIsConnected(true);
      checkAndCreateAccount(storedAccount); 
    } else {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          const walletId = accounts[0];
          setAccount(walletId);
          localStorage.setItem("account", walletId);
          setIsConnected(true);

          checkAndCreateAccount(walletId); 
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload(); 
      });
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        account,
        isConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

