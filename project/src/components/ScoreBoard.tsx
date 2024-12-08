import React from 'react';
import { Player } from '../types/game';

interface ScoreBoardProps {
  scores: Record<Player, number>;
  currentPlayer: Player;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, currentPlayer }) => {
  return (
    <div className="flex justify-between items-center mb-8 px-4 py-3 bg-white rounded-lg shadow-md">
      <div className={`text-blue-600 font-bold ${currentPlayer === 'X' ? 'text-2xl' : 'text-xl'}`}>
        Player X: {scores.X}
      </div>
      <div className={`text-red-600 font-bold ${currentPlayer === 'O' ? 'text-2xl' : 'text-xl'}`}>
        Player O: {scores.O}
      </div>
    </div>
  );
};