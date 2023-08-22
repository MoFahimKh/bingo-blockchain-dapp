import React, { useState, useContext, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { WalletContext } from "../../context/WalletContext";
import { bingoTable } from "../../utils/etherUtils";
import { drawNumber } from "../../utils/contractInteractions";
import { ClipLoader } from "react-spinners";
import { getMinDrawDuration } from "../../utils/etherUtils";
import SubmitBingo from "./SubmitBingo";
const BingoTable = () => {
  const { address, gameIndex } = useContext(WalletContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [numberDrawn, setNumberDrawn] = useState(null);
  const [isNumberDrawn, setIsNumberDrawn] = useState(false);
  const [clickedCells, setClickedCells] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [drawnValues, setDrawnValues] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const fetchedTableData = await bingoTable(gameIndex, address);
        if (fetchedTableData) {
          const firstPart = fetchedTableData.slice(0, 12);
          const secondPart = fetchedTableData.slice(12);
          const modifiedArray = [...firstPart, "X", ...secondPart];
          setTableData(modifiedArray);
          setIsLoading(false);
        } else {
          console.error("The fetched table data doesn't have enough elements.");
        }
      } catch (error) {
        console.error("Error fetching Bingo table:", error);
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, []);

  const handleDraw = async () => {
    const minDurationForDraw = await getMinDrawDuration();
    const minDurationForDrawInDecimal = parseInt(minDurationForDraw);
    if (isWaiting) {
      return;
    }
    setIsWaiting(true);

    try {
      const trsx = await drawNumber(gameIndex);
      setIsNumberDrawn(false);
      const receipt = await trsx.wait();
      const numberDrawn = await receipt.events[0].args[1];
      setNumberDrawn(numberDrawn);
      setIsNumberDrawn(true);
      setDrawnValues([...drawnValues, numberDrawn]);
    } catch (error) {
      console.error("Error drawing Number:", error);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div className="bingo-table-container">
      {isLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", height: "20px" }}
        >
          Loading your Bingo table....
        </div>
      ) : (
        <div className="bingo-table">
          {Array.from({ length: Math.ceil(tableData.length / 5) }).map(
            (_, rowIndex) => (
              <Row key={rowIndex} className="bingo-row">
                {Array.from({ length: 5 }).map((_, colIndex) => {
                  const dataIndex = rowIndex * 5 + colIndex;
                  const cellData = tableData[dataIndex];
                  const isCellClicked = clickedCells.includes(dataIndex);
                  const isValueCame = drawnValues.includes(cellData);
                  return (
                    <Col
                      key={colIndex}
                      className={`bingo-cell ${isCellClicked ? "clicked" : ""}`}
                      onClick={() => {
                        if (!isCellClicked && dataIndex !== 12) {
                          setClickedCells([...clickedCells, dataIndex]);
                        }
                      }}
                    >
                      {cellData !== undefined ? cellData : ""}
                    </Col>
                  );
                })}
              </Row>
            )
          )}
          <div>
            <button
              className="btn"
              onClick={handleDraw}
              style={{
                marginBottom: "10px",
                marginBottom: "10px",
                width: "150px",
                border: "1px solid plum",
              }}
              disabled={isWaiting}
            >
              Draw Number
            </button>
            <span
              style={{
                marginLeft: "15px",
                fontSize: "large",
                height: "15px",
              }}
            >
              {isNumberDrawn ? (
                <span style={{ color: "lightGreen", fontSize: "large" }}>
                  {numberDrawn}
                  {!isWaiting && <ClipLoader style={{ height: "10px" }} />}
                </span>
              ) : (
                isWaiting && (
                  <span style={{ color: "red", fontSize: "small" }}>
                    Wait for 10 seconds
                  </span>
                )
              )}
            </span>
          </div>
          {clickedCells.length === tableData.length - 1 && (
            <SubmitBingo
              clickedCells={clickedCells}
              drawnValues={drawnValues}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BingoTable;
