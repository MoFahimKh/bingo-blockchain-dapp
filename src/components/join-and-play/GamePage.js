import React, { useState } from "react";
import BingoTable from "./BingoTable";
import JoinGamePopupCard from "./JoinGamePopupCard";

const GamePage = () => {
  const [isGameJoined, setIsGameJoined] = useState(false);
  const [isJoiningInprogress, setIsJoiningInprogress] = useState("");

  return (
    <div>
      <JoinGamePopupCard
        isOpen={!isGameJoined}
        toggle={() => setIsGameJoined(!isGameJoined)}
        setIsGameJoined={setIsGameJoined}
        setIsJoiningInprogress={setIsJoiningInprogress}
      />
      <div
        className="overlay"
        style={{
          display: isJoiningInprogress === "inProgress" ? "flex" : "none",
        }}
      >
        <div className="popup">Joining game...</div>
      </div>
      {isGameJoined && isJoiningInprogress === "done" && <BingoTable />}
    </div>
  );
};

export default GamePage;
