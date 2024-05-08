import React, { useEffect, useState, useCallback } from "react";
import { generateInitialState, generateInit } from "../../utils/algo.ts";
import "./Board.css";

const size = 40;

type BoardType = Array<Array<0 | 1>>;

const valid = (col: number, row: number) => {
  return 0 <= row && row < size && 0 <= col && col < size;
};

const generateState = (s: BoardType) => {
  const state = s.map((row) => [...row]);
  const directions = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
    [-1, -1],
  ];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      let aliveNeighboors = 0;
      for (const [dx, dy] of directions) {
        const next_row = row + dy;
        const next_col = col + dx;

        if (valid(next_row, next_col)) {
          aliveNeighboors += s[next_row][next_col];
        }
      }

      if (s[row][col] === 1) {
        state[row][col] =
          aliveNeighboors === 3 || aliveNeighboors === 2 ? 1 : 0;
      } else {
        state[row][col] = aliveNeighboors === 3 ? 1 : 0;
      }
    }
  }

  return state;
};

const initial = generateInitialState(size);
const init = generateInit(size);

const Board = () => {
  const [board, setBoard] = useState<BoardType>(init);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [timer, setTimer] = useState<any>(false);

  const handleMouseDown = (row, col, bypass = false) => {
    if (isMouseDown || bypass) {
      const newB = [...board];
      newB[row][col] = newB[row][col] === 1 ? 0 : 1;

      setBoard(newB);
    }
  };

  useEffect(() => {
    if (!timer) {
      return;
    }

    const t = setInterval(() => {
      setBoard(generateState(board));
    }, 500);

    return () => clearInterval(t);
  }, [board, timer]);

  return (
    <div className="container">
      <div className="board">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              onMouseUp={() => {
                if (isMouseDown) {
                  setIsMouseDown(false);
                }
              }}
              onMouseDown={() => {
                if (!isMouseDown) {
                  setIsMouseDown(true);
                }
              }}
              onMouseEnter={() => handleMouseDown(i, j)}
              onClick={() => handleMouseDown(i, j, true)}
              key={`${i}${j}`}
              className={`cell ${cell === 1 && "cell_alive"}`}
            ></div>
          ))
        )}
      </div>

      <button
        onClick={() => setTimer(true)}
        className="favorite styled"
        type="button"
      >
        START
      </button>
      <button
        onClick={() => setTimer(false)}
        className="favorite styled"
        type="button"
      >
        STOP
      </button>
      <button
        onClick={() => {
          setBoard(generateState(board));
        }}
        className="favorite styled"
        type="button"
      >
        Next Step
      </button>
      <button
        onClick={() => {
          setBoard(generateInit(size));
        }}
        className="favorite styled"
        type="button"
      >
        CLEAR ALL
      </button>
      <button
        onClick={() => {
          setBoard(init);
        }}
        className="favorite styled"
        type="button"
      >
        RESET TO INITAL STATE
      </button>
      <button
        onClick={() => {
          localStorage.setItem("state", JSON.stringify(board));
        }}
        className="favorite styled"
        type="button"
      >
        COPY
      </button>
      <button
        onClick={() => {
          const a = localStorage.getItem("state");
          if (a) {
            setBoard(JSON.parse(a));
          }
        }}
        className="favorite styled"
        type="button"
      >
        PASTE LAst State
      </button>
    </div>
  );
};

export default Board;
