import React from 'react';
import { Cell } from './Cell';
import { BoardState, Player } from '../types/game';
import { checkWinner } from '../utils/gameLogic';

interface SubBoardProps {
  board: BoardState;
  boardIndex: number;
  isActive: boolean;
  onCellClick: (boardIndex: number, cellIndex: number) => void;
}

export const SubBoard: React.FC<SubBoardProps> = ({
  board,
  boardIndex,
  isActive,
  onCellClick,
}) => {
  const winner = checkWinner(board);

  return (
    <div className={`grid grid-cols-3 gap-1 bg-gray-200 p-1 relative
      ${isActive ? 'ring-2 ring-blue-400' : ''}`}>
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          isActive={isActive && !winner}
          onClick={() => onCellClick(boardIndex, index)}
        />
      ))}
      {winner && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <span className={`text-4xl font-bold
            ${winner === 'X' ? 'text-blue-600' : 'text-red-600'}`}>
            {winner}
          </span>
        </div>
      )}
    </div>
  );
};