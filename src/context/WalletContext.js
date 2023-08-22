import { createContext, useEffect, useState } from "react";
import { getSignerAddress, isValidAddress } from "../utils/etherUtils";
import { createGame } from "../utils/contractInteractions";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [gameCreationInfo, setGameCreationInfo] = useState(null);
  const [gameIndexUsed, setGameIndexUsed] = useState(null);
  const [gameIndex, setGameIndex] = useState(null);
  const [isGameCreated, setIsGameCreated] = useState("");
  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum && window.ethereum.isMetaMask) {
          const addr = await getSignerAddress();
          setAddress(addr);
        }
      } catch (err) {
        console.log(err);
      }

      if (window.ethereum) {
        window.ethereum.on("accountsChanged", connectWallet);
      }
    };
    init();
  }, []);

  const fetchBalances = async () => {
    if (isValidAddress(address)) {
      // Fetch balances
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const addr = await getSignerAddress();
        setAddress(addr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = async () => {
    try {
      setAddress(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateGame = async () => {
    try {
      const createdGameResponse = await createGame();
      setIsGameCreated("inProgress");
      const recipt = await createdGameResponse.wait();
      const creationComplete = await recipt.events;
      setGameCreationInfo(createdGameResponse);
      setIsGameCreated("created");
    } catch (error) {
      console.error("Error creating game:", error);
      setGameCreationInfo("error");
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        connectWallet,
        disconnectWallet,
        fetchBalances,
        handleCreateGame,
        gameCreationInfo,
        gameIndexUsed,
        setGameIndexUsed,
        gameIndex,
        setGameIndex,
        isGameCreated,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
