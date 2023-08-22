import React, { useState, useContext } from "react";
import { WalletContext } from "../../context/WalletContext";
import { submitBingo } from "../../utils/contractInteractions";

const SubmitBingo = ({ drawnValues, clickedCells }) => {
  const { disconnectWallet, gameIndex } = useContext(WalletContext);
  const [isBingo, setIsBingo] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmit = async () => {
    const sortedDrawnValues = drawnValues.slice().sort();
    const sortedClickedCells = clickedCells.slice().sort();
    setSubmitClicked(true);
    if (
      drawnValues.length === clickedCells.length &&
      sortedDrawnValues.every((value) =>
        sortedClickedCells.includes(tableData.indexOf(value))
      )
    ) {
      const submitBingo = await submitBingo(gameIndex);
      const trnsxResponse = await submitBingo.wait();
      setIsBingo(true);
      console.log("YOU WON!!", trnsxResponse);
    } else {
      setIsBingo(false);
      console.log("HELLO LOSER!!");
    }
  };
  return (
    <>
      <div>
        <button className="btn" onClick={handleSubmit}>
          Submit Bingo
        </button>
      </div>
      {isBingo && submitClicked && (
        <div
          className="overlay"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div className="popup">
            Congratss!! YOU WON!{" "}
            <button className="btn" onClick={disconnectWallet}>
              Restart The Game!
            </button>
          </div>
        </div>
      )}
      {!isBingo && submitClicked && clickedCells && (
        <div
          className="overlay"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div className="popup">
            You Loose!{" "}
            <button className="btn" onClick={disconnectWallet}>
              Restart The Game!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitBingo;
