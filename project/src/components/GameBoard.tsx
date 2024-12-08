import React from 'react';
import { SubBoard } from './SubBoard';
import { GameState } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
  onCellClick: (boardIndex: number, cellIndex: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onCellClick }) => {
  return (
    <div className="grid grid-cols-3 gap-4 aspect-square w-full max-w-2xl">
      {gameState.subBoards.map((board, index) => (
        <SubBoard
          key={index}
          board={board}
          boardIndex={index}
          isActive={
            gameState.nextBoardIndex === null ||
            gameState.nextBoardIndex === index
          }
          onCellClick={onCellClick}
        />
      ))}
    </div>
  );
};