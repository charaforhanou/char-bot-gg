import React from 'react';
import { GameBoard } from './components/GameBoard';
import { ScoreBoard } from './components/ScoreBoard';
import { useGame } from './hooks/useGame';
import { RotateCcw } from 'lucide-react';

function App() {
  const { gameState, handleMove, resetGame } = useGame();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Nested Tic-Tac-Toe</h1>
          <p className="text-gray-600">
            Win three sub-games in a row to claim victory!
          </p>
        </div>

        <ScoreBoard
          scores={gameState.scores}
          currentPlayer={gameState.currentPlayer}
        />

        <div className="relative">
          <GameBoard
            gameState={gameState}
            onCellClick={handleMove}
          />

          {gameState.winner && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Player {gameState.winner} Wins!
                </h2>
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RotateCcw size={20} />
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            {gameState.nextBoardIndex !== null
              ? `Next move must be in board ${gameState.nextBoardIndex + 1}`
              : 'You can play in any available board'}
          </p>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors mx-auto"
          >
            <RotateCcw size={16} />
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;