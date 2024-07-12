import React, { useEffect, useState } from "react";
import { createArray } from "../utils/javascript";

const generateWord = [2, 4];

const GameBoardContainer = () => {
  const [board, setBoard] = useState(() => {
    const state = createArray(4, null);
    return state.map(() => createArray(4, null));
  });
  const keyCode = [
    { key: "ArrowRight", row: 1, column: 0 },
    { key: "ArrowLeft", row: -1, column: 0 },
    { key: "ArrowDown", row: 0, column: 1 },
    { key: "ArrowUp", row: 0, column: -1 },
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const findValue = (value) => {
    const undefinedValue = value.reduce((total, val, ind) => {
      const a = val.reduce((full, item, index) => {
        if (!item) {
          full.push(index);
        }
        return full;
      }, []);
      total.push(a);
      return total;
    }, []);
    console.log(undefinedValue);
    return undefinedValue;
  };

  const selectOneValue = (value) => {
    const columIndex = selectColumn(value);
    const rowIndex = selectRow(value[columIndex]);
    return {
      columIndex,
      rowIndex,
    };
  };

  const selectColumn = (value) => {
    const RandomColumn = getRandomInt(4);
    return value?.[RandomColumn]?.length !== 0
      ? RandomColumn
      : selectColumn(value);
  };

  const selectRow = (value) => {
    const lengthOfValue = value.length;
    const RandomColumn = getRandomInt(
      lengthOfValue === 1 ? 0 : lengthOfValue - 1
    );
    return value[RandomColumn];
  };

  const gameOverFunction = (value) => {
    return value.every((val) => val.length === 0);
  };

  useEffect(() => {
    window.addEventListener("keyup", (event) => {
      const isArrowKey = keyCode.filter((item) => item.key === event.code);
      if (isArrowKey.length) {
        const arrayOfBoard = [...board];
        const { row, column } = isArrowKey[0];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const rowSafety = row + j === -1 ? 0 : row + j === 4 ? 3 : row + j;
            const colSafety =
              column + i === -1 ? 0 : column + i === 4 ? 3 : column + i;

            if (arrayOfBoard[colSafety][rowSafety] && arrayOfBoard[i][j]) {
              if (
                arrayOfBoard[colSafety][rowSafety].value ===
                arrayOfBoard[i][j].value
              ) {
                arrayOfBoard[colSafety][rowSafety].value =
                  arrayOfBoard[i][j].value + arrayOfBoard[i][j].value;
                arrayOfBoard[i][j] = undefined;
              }
            }
            if (
              arrayOfBoard[colSafety][rowSafety] === undefined &&
              arrayOfBoard[i][j]
            ) {
              arrayOfBoard[colSafety][rowSafety] = {
                value: arrayOfBoard[i][j].value,
                merge: true,
              };
            }
          }
        }

        setBoard((prev) => {
          const findUndefinedValue = findValue(prev);
          const isGameOver = gameOverFunction(findUndefinedValue);
          if (isGameOver) return prev;
          const { columIndex, rowIndex } = selectOneValue(findUndefinedValue);
          prev[columIndex][rowIndex] = {
            value: generateWord[getRandomInt(generateWord.length)],
            merge: true,
          };
          return [...prev];
        });
      }
    });
  }, []);

  return {
    board,
  };
};

export default GameBoardContainer;
