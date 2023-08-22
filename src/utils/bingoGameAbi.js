export const BINGO_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_entryFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minJoinDuration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minTurnDuration",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BingoCheckFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "CannotJoinTwice",
    type: "error",
  },
  {
    inputs: [],
    name: "GameInProgress",
    type: "error",
  },
  {
    inputs: [],
    name: "GameIsOver",
    type: "error",
  },
  {
    inputs: [],
    name: "GameNotCreated",
    type: "error",
  },
  {
    inputs: [],
    name: "GameNotStarted",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAPlayer",
    type: "error",
  },
  {
    inputs: [],
    name: "WaitForNextTurn",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "numberDrawn",
        type: "uint8",
      },
    ],
    name: "Draw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "newEntryFee",
        type: "uint256",
      },
    ],
    name: "EntryFeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "GameCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winnings",
        type: "uint256",
      },
    ],
    name: "GameOver",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "newMinJoinDuration",
        type: "uint256",
      },
    ],
    name: "JoinDurationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "gameIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "PlayerJoined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "newMinTurnDuration",
        type: "uint256",
      },
    ],
    name: "TurnDurationUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameIndex",
        type: "uint256",
      },
    ],
    name: "bingo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "createGame",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameIndex",
        type: "uint256",
      },
    ],
    name: "draw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "entryFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gameCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "games",
    outputs: [
      {
        internalType: "bool",
        name: "isGameComplete",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isGameInProcess",
        type: "bool",
      },
      {
        internalType: "uint64",
        name: "startTime",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "lastDrawTime",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "gameEntryFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "playerCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameIndex",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "getBoard",
    outputs: [
      {
        internalType: "uint8[24]",
        name: "_board",
        type: "uint8[24]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gameIndex",
        type: "uint256",
      },
    ],
    name: "joinGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minJoinDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minTurnDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newEntryFee",
        type: "uint256",
      },
    ],
    name: "updateEntryFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newMinJoinDuration",
        type: "uint256",
      },
    ],
    name: "updateMinJoinDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newMinTurnDuration",
        type: "uint256",
      },
    ],
    name: "updateMinTurnDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
