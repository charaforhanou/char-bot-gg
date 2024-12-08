import React from 'react';
import { CellValue } from '../types/game';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isActive: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, isActive }) => {
  return (
    <button
      className={`w-full h-full flex items-center justify-center text-2xl font-bold
        ${isActive ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed'}
        ${value === 'X' ? 'text-blue-600' : 'text-red-600'}`}
      onClick={onClick}
      disabled={!isActive || value !== null}
    >
      {value}
    </button>
  );
};