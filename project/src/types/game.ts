export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[];

export interface GameState {
  mainBoard: CellValue[];
  subBoards: BoardState[];
  currentPlayer: Player;
  nextBoardIndex: number | null;
  winner: Player | null;
  scores: {
    X: number;
    O: number;
  };
}