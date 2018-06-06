import { TilePosition } from "./tile-position";

export interface Move {
    fromPosition: TilePosition,
    toPosition: TilePosition,
    takenPiece: TilePosition
}