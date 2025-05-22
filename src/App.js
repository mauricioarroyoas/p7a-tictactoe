import { useState } from "react";

function Square({ value, onSquareClick, className = "" }) {
  return (
    <button className={`square ${className}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i]) {
      return;
    }

    if (calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  function isGameFinished(squares) {
    for (let index = 0; index < squares.length; index++) {
      if (squares[index] === null) {
        return false;
      }
    }
    return true;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
    if (isGameFinished(squares)) {
      status = "Draw!";
    }
  }

  const size = 3;
  const winnerSquares = winner ? getWinnerSquares(squares) : [];
  const rows = [];
  for (let row = 0; row < size; row++) {
    const squaresRow = [];
    for (let col = 0; col < size; col++) {
      const index = row * size + col;
      const isWinnerSquare = winnerSquares.includes(index);
      squaresRow.push(
        <Square
          key={index}
          value={squares[index]}
          className={isWinnerSquare ? "square-winner" : ""}
          onSquareClick={() => handleClick(index)}
        />
      );
    }
    rows.push(
      <div key={row} className="board-row">
        {squaresRow}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), moveLocation: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const currentSquares = history[currentMove].squares;

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  function handlePlay(nextSquares, moveIndex) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, moveLocation: moveIndex },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  const moves = history.map((entry, move) => {
    const description = move ? `Go to move #${move}` : "Go to game start";

    let locationText = "";
    if (entry.moveLocation !== null) {
      const row = Math.floor(entry.moveLocation / 3);
      const col = entry.moveLocation % 3;
      locationText = ` (${row}, ${col})`;
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          `You are at move ${move}${locationText}`
        ) : (
          <button onClick={() => jumpTo(move)}>
            {description + locationText}
          </button>
        )}
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <label className="toggle">
          <input
            type="checkbox"
            checked={isAscending}
            onChange={() => setIsAscending(!isAscending)}
          />
          <span className="slider"></span>
          <span className="toggle-label">
            {isAscending ? "Ascending" : "Descending"}
          </span>
        </label>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getWinnerSquares(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }

  return [];
}
