import React, { useState, useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { joinGame } from "../../utils/contractInteractions";
import { WalletContext } from "../../context/WalletContext";

const JoinGamePopupCard = ({
  isOpen,
  toggle,
  setIsGameJoined,
  setIsJoiningInprogress,
}) => {
  const [isErrorInJoining, setIsErrorInJoining] = useState(false);
  const [joiningMessage, setJoiningMessage] = useState("");
  const { gameIndex, setGameIndex } = useContext(WalletContext);
  // const [isJoiningInprogress, setIsJoiningInprogress] = useState("");

  const handleNumberChange = (e) => {
    setGameIndex(e.target.value);
  };

  const handleJoinClick = async () => {
    try {
      const join = await joinGame(gameIndex);
      console.log(join);
      setIsJoiningInprogress("inProgress");
      const TrsnxEvents = await join.wait();
      setIsJoiningInprogress("done");
      console.log("TrnsxEvent", TrsnxEvents);
      if (!join.nonce) {
        setIsGameJoined(false);
        setIsErrorInJoining(true);
        setJoiningMessage(join.reason.toString());
        setGameIndex("");
      } else {
        setIsErrorInJoining(false);
        setJoiningMessage("Joined Game Successfully!");
        setIsGameJoined(true);
        toggle();
        setGameIndex(gameIndex);
      }
      console.log("reason!", join.reason);
    } catch (err) {
      console.error(err.reason);
    }
  };

  const handleCancelClick = () => {
    setGameIndex("");
    toggle();
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Join Game</ModalHeader>
        <ModalBody>
          <Input
            type="number"
            placeholder="Enter Game Index"
            value={gameIndex}
            onChange={handleNumberChange}
          />
        </ModalBody>
        <ModalFooter
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <button
            className="btn"
            style={{
              width: "200px",
              borderRadius: "25px",
              border: "1px solid lightGreen",
              color: "white",
              background: "lightGreen",
            }}
            color="primary"
            onClick={handleJoinClick}
          >
            Join Game
          </button>{" "}
          <button
            className="btn"
            style={{
              width: "200px",
              borderRadius: "25px",
              border: "1px solid plum",
            }}
            color="secondary"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </ModalFooter>
        {isErrorInJoining ? (
          <div style={{ padding: "0 20px", marginBottom: "5%" }}>
            <div style={{ color: "red" }}>{joiningMessage}</div>
            <a
              style={{ fontSize: "small" }}
              href="https://mumbai.polygonscan.com/address/0xF5968a02084C6221F8eeD45EB1AcB3BaE6F59F4b"
              target="_blank"
            >
              go to this website to mint and allow TEST ERC20 tokens
            </a>
          </div>
        ) : (
          <div style={{ color: "lightgreen" }}>{joiningMessage}</div>
        )}
      </Modal>
    </>
  );
};

export default JoinGamePopupCard;
