import React from "react";
import GameBoardContainer from "../container/gameBoard.container";

const GameBoard = () => {
  const { board } = GameBoardContainer();
  return (
    <>
      <div className="container">
        {board.map((item, ind) => {
          return (
            <>
              <div className="row" key={ind}>
                {item.map((value, index) => {
                  return (
                    <div key={`${ind}-${index}`} className="cell">
                      {String(value?.value)}
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default GameBoard;
