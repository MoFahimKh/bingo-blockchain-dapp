import React, { useContext, useState } from "react";
import { Button, CardBody } from "reactstrap";
import { WalletContext } from "../../context/WalletContext";
import GamePage from "../join-and-play/GamePage";
import formatAddress from "../../utils/formatAddress";
import CreateGame from "../create-game/CreateGame";

const HomePage = () => {
  const {
    address,
    disconnectWallet,
    handleCreateGame,
    gameCreationInfo,
    isGameCreated,
  } = useContext(WalletContext);
  const [showJoinGame, setShowJoinGame] = useState(false);

  const handleJoinGame = () => {
    setShowJoinGame(true);
  };

  return (
    <div>
      <div
        className="Card"
        style={{ left: "10px", width: "250px", color: "#6d5ee7" }}
      >
        {address !== null && `Connected to: ${formatAddress(address)}`}
      </div>
      <div className="Card" style={{ width: "400px", margin: "auto" }}>
        <CardBody>
          <button
            style={{ border: "1px solid plum", borderRadius: "25px" }}
            className="btn"
            onClick={handleCreateGame}
            color="primary"
            block
            disabled={isGameCreated === "inProgress"}
          >
            Create Game
          </button>
        </CardBody>
        <CardBody>
          <button
            style={{ border: "1px solid plum", borderRadius: "25px" }}
            className="btn"
            onClick={handleJoinGame}
            size="md"
            color="primary"
            block
            disabled={isGameCreated === "inProgress"}
          >
            Join Game
          </button>
        </CardBody>
      </div>
      <div
        style={{
          width: "170px",
          top: "600px",
          right: "20px",
          position: "absolute",
        }}
      >
        <Button
          style={{ borderRadius: "25px" }}
          className="btn"
          onClick={disconnectWallet}
          size="md"
          color="danger"
          block
        >
          Disconnect
        </Button>
      </div>
      {gameCreationInfo && <CreateGame />}
      {showJoinGame && <GamePage />}
      <div
        className="overlay"
        style={{ display: isGameCreated === "inProgress" ? "flex" : "none" }}
      >
        <div className="popup">Creating game...</div>
      </div>
    </div>
  );
};

export default HomePage;
