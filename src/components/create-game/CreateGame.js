import React, { useContext, useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { WalletContext } from "../../context/WalletContext";
import Timer from "./Timer";
import TransactionAlert from "./TransactionAlert";
import { getGameCount } from "../../utils/etherUtils";

const CreateGame = () => {
  const { gameCreationInfo, setGameIndex } = useContext(WalletContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [transactionConfirmed, setTransactionConfirmed] = useState(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const init = async () => {
      if (gameCreationInfo === "error") {
        setTransactionConfirmed(false);
        setModalContent(
          <>
            <ModalHeader>Error</ModalHeader>
            <ModalBody>Transaction Failed, Cannot Create Game!</ModalBody>
            <ModalFooter>
              <button
                className="btn"
                style={{
                  width: "100%",
                  borderRadius: "25px",
                  border: "1px solid plum",
                }}
                onClick={toggleModal}
              >
                Close
              </button>
            </ModalFooter>
          </>
        );
      } else if (gameCreationInfo && gameCreationInfo.nonce) {
        setTransactionConfirmed(true);
        const hexValue = await getGameCount();
        const calcutaltedGameIndex = parseInt(hexValue);
        setGameIndex(calcutaltedGameIndex);
        setModalContent(
          <>
            <ModalHeader>Game Creation Info</ModalHeader>
            <ModalBody>
              <p>Game Index: {calcutaltedGameIndex} </p>
              <p>
                Game will start in :<Timer />
              </p>
            </ModalBody>
            <ModalFooter>
              <button
                className="btn"
                style={{
                  width: "100%",
                  borderRadius: "25px",
                  border: "1px solid plum",
                }}
                onClick={toggleModal}
              >
                Close
              </button>
            </ModalFooter>
          </>
        );
      }

      setModalOpen(true);
    };

    init();
  }, [gameCreationInfo]);

  return (
    <>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        {modalContent}
      </Modal>
      <TransactionAlert transactionConfirmed={transactionConfirmed} />
    </>
  );
};

export default CreateGame;
