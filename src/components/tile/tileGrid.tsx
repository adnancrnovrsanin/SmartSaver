import React, { useState } from "react";
import Tile from "./tile";
import TilePicker from "../tilePicker/tilePicker";

interface TileGridProps {
  rows: number;
  columns: number;
  editMode: boolean;
  setEditMode: any;
}

const TileGrid: React.FC<TileGridProps> = ({
  rows,
  columns,
  editMode,
  setEditMode,
}) => {
  let fields = Array(11).fill(Array(11).fill(0));
  let [tileValue, setTileValue] = useState(0);
  const[isMouseDown, setIsMouseDown] = useState(false)
  const renderTiles = () => {
    const tiles = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(
          <Tile
            key={`${i}-${j}`}
            value={fields[i][j]}
            tileValue={tileValue}
            fields={fields}
            i={i}
            j={j}
            onClick={() => console.log("proba")}
            editMode={editMode}
            isMouseDown={isMouseDown}
            setIsMouseDown={setIsMouseDown}
          />
        );
      }
      tiles.push(
        <div key={i} className="tile-row">
          {row}
        </div>
      );
    }

    return tiles;
  };

  function changeEditMode() {
    setEditMode(!editMode);
  }

  return (
    <div className="tile-grid flex-column">
      <div className="w-screen flex justify-end pr-3">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => changeEditMode()}
        >
          Edit Mode
        </button>
      </div>
      {editMode && <TilePicker value={tileValue} setValue={setTileValue} />}
      <div className="w-screen flex justify-center">{renderTiles()}</div>
    </div>
  );
};

export default TileGrid;
