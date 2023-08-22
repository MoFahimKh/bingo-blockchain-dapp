import { ethers } from "ethers";
import { BABYDOGE_TOKEN, BINGO_CONTRACT_ADD } from "./constants";
import { BINGO_ABI } from "./bingoGameAbi";

export const createGame = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const bingoContract = new ethers.Contract(
    BINGO_CONTRACT_ADD,
    BINGO_ABI,
    provider
  );
  const BingoSigner = bingoContract.connect(signer);
  const createGame = await BingoSigner.createGame();
  console.log("Created", createGame);
  return await createGame;
};

export const joinGame = async (index) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const bingoContract = new ethers.Contract(
      BINGO_CONTRACT_ADD,
      BINGO_ABI,
      provider
    );
    const BingoSigner = bingoContract.connect(signer);
    const joinGame = await BingoSigner.joinGame(index);
    console.log("Joined!", joinGame);
    return await joinGame;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const drawNumber = async (index) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const bingoContract = new ethers.Contract(
      BINGO_CONTRACT_ADD,
      BINGO_ABI,
      provider
    );
    
    const BingoSigner = bingoContract.connect(signer);
    const drawnNumber = await BingoSigner.draw(index);
    return await drawnNumber;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const submitBingo = async (index) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const bingoContract = new ethers.Contract(
      BINGO_CONTRACT_ADD,
      BINGO_ABI,
      provider
    );
    
    const BingoSigner = bingoContract.connect(signer);
    const bingo = await BingoSigner.bingo(index);
    return await bingo;
  } catch (err) {
    console.error(err);
    return err;
  }
};
