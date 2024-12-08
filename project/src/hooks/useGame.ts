import { useState, useCallback } from 'react';
import { GameState, Player } from '../types/game';
import { checkWinner, getNextPlayer, isBoardFull } from '../utils/gameLogic';

const createEmptyBoard = () => Array(9).fill(null);

const initialGameState: GameState = {
  mainBoard: createEmptyBoard(),
  subBoards: Array(9).fill(null).map(() => createEmptyBoard()),
  currentPlayer: 'X',
  nextBoardIndex: null,
  winner: null,
  scores: { X: 0, O: 0 }
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handleMove = useCallback((boardIndex: number, cellIndex: number) => {
    if (
      gameState.winner ||
      (gameState.nextBoardIndex !== null && gameState.nextBoardIndex !== boardIndex) ||
      gameState.mainBoard[boardIndex] ||
      gameState.subBoards[boardIndex][cellIndex]
    ) {
      return;
    }

    setGameState(prevState => {
      const newSubBoards = [...prevState.subBoards];
      newSubBoards[boardIndex] = [...prevState.subBoards[boardIndex]];
      newSubBoards[boardIndex][cellIndex] = prevState.currentPlayer;

      const subBoardWinner = checkWinner(newSubBoards[boardIndex]);
      const newMainBoard = [...prevState.mainBoard];
      
      if (subBoardWinner) {
        newMainBoard[boardIndex] = subBoardWinner;
      }

      const mainBoardWinner = checkWinner(newMainBoard);
      const nextPlayer = getNextPlayer(prevState.currentPlayer);

      let nextBoard = cellIndex;
      if (newMainBoard[nextBoard] || isBoardFull(newSubBoards[nextBoard])) {
        nextBoard = null;
      }

      const newScores = { ...prevState.scores };
      if (mainBoardWinner) {
        newScores[mainBoardWinner]++;
      }

      return {
        mainBoard: newMainBoard,
        subBoards: newSubBoards,
        currentPlayer: nextPlayer,
        nextBoardIndex: nextBoard,
        winner: mainBoardWinner,
        scores: newScores
      };
    });
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState(prevState => ({
      ...initialGameState,
      scores: prevState.scores
    }));
  }, []);

  return {
    gameState,
    handleMove,
    resetGame
  };
};