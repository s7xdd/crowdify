import { createContext, useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async (e) => {
e.preventDefault();
    try {
      const provider = await detectEthereumProvider();

      if (!provider) {
        alert('MetaMask is not installed. Please install it to use the wallet.');
        return;
      }

      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      localStorage.setItem('account', accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    localStorage.removeItem('account');
    setAccount(null);
    setIsConnected(false);
  };

  useEffect(() => {
    const storedAccount = localStorage.getItem('account');
    if (storedAccount) {
      setAccount(storedAccount);
      setIsConnected(true);
    } else {
      connectWallet();
    }
  },[]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {

          setAccount(accounts);
          setIsConnected(true);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
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

