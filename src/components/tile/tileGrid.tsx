import React, { useState } from "react";
import Tile from "./tile";
import TilePicker from "../tilePicker/tilePicker";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

interface TileGridProps {
  // rows: number;
  // columns: number;
  // editMode: boolean;
  // setEditMode: any;
}

const TileGrid: React.FC<TileGridProps> = ({}) => {
  let fields = Array(11).fill(Array(11).fill(0));
  let [tileValue, setTileValue] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [rows, setRows] = useState(11);
  const [columns, setColumns] = useState(11);
  const [editMode, setEditMode] = useState(false);
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
      <div className="w-screen flex justify-end p-3">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => changeEditMode()}
        >
          Edit Mode
        </button>
      </div>
      {editMode && (<div className="flex gap-6 justify-center p-6">
        <div className="flex-col gap-3">
          <Label htmlFor="rows">Rows</Label>
          <Input
            id="rows"
            type="number"
            value={rows}
            className="w-52"
            onChange={(e) => setRows(Number(e.target.value))}
          />
        </div>
        <div className="flex-col gap-3">
          <Label htmlFor="col">Columns</Label>
          <Input
            id="col"
            type="number"
            className="w-52"
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
          />
        </div>
      </div>)}
      {editMode && <TilePicker value={tileValue} setValue={setTileValue} />}
      <div className="w-screen flex justify-center">{renderTiles()}</div>
    </div>
  );
};

export default TileGrid;
