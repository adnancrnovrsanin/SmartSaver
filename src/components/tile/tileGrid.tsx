import React, { useEffect, useState } from "react";
import Tile from "./tile";
import TilePicker from "../tilePicker/tilePicker";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/store";
import { CustomH1 } from "../Typography/CustomH1";
import FieldTable from "./FieldTable"

interface TileGridProps {}

const TileGrid: React.FC<TileGridProps> = ({}) => {
  const [tileValue, setTileValue] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [rows, setRows] = useState(11);
  const [columns, setColumns] = useState(11);
  const [editMode, setEditMode] = useState(false);
  const [fieldsState, setFieldsState] = useState(
    Array(11).fill(Array(11).fill(0))
  );
  const { devicesStore } = useStore();
  const { setHomeMap } = devicesStore;
  let fields = fieldsState;

  function changeRows(newRows: number) {
    if (newRows > fields.length) {
      for (let i = fields.length; i < newRows; i++) {
        fields.push(Array(columns).fill(0));
      }
    } else if (newRows < fields.length) {
      fields = fields.slice(0, newRows);
    }
    setFieldsState(fields);
    setRows(newRows);
  }

  function changeColumns(newColumns: number) {
    if (columns > fields[0].length) {
      fields = fieldsState.map((row) => [...row, 0]);
    } else if (columns < fields[0].length) {
      fields = fieldsState.map((row) => row.slice(0, columns));
    }
    setFieldsState(fields);
    setColumns(newColumns);
  }

  function changeEditMode() {
    setEditMode(!editMode);
    if (editMode) {
      setHomeMap({
        houseMap: fieldsState,
        mapRowCount: rows,
        mapColumnCount: columns,
      });
    }
  }

  return (
    <div className="tile-grid flex-column overflow-hidden h-fit mb-24">
      <div className="w-screen flex justify-end p-3 overflow-hidden mr-5">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 mr-5 rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          onClick={() => changeEditMode()}
        >
          {editMode ? "Save" : "Edit"}
        </button>
      </div>
      <CustomH1 text="Home Map" />
      {editMode && (
        <div className="flex gap-6 justify-center p-6">
          <div className="flex-col gap-3">
            <Label htmlFor="rows">Enter width of your house</Label>
            <Input
              id="rows"
              type="number"
              value={rows}
              className="w-52"
              min={1}
              onChange={(e) => changeRows(Number(e.target.value))}
            />
          </div>
          <div className="flex-col gap-3">
            <Label htmlFor="col">Enter height of your house</Label>
            <Input
              id="col"
              type="number"
              className="w-52"
              value={columns}
              min={1}
              onChange={(e) => changeColumns(Number(e.target.value))}
            />
          </div>
        </div>
      )}
      {editMode && <TilePicker value={tileValue} setValue={setTileValue} />}
      <div className="w-screen flex justify-center mb-5 rounded">
        {fieldsState.map((row, j) => {
          return (
            <div key={j} className="tile-row">
              {row.map((tile: any, i: any) => (
                <Tile
                  key={i}
                  value={tile}
                  tileValue={tileValue}
                  setFieldsState={setFieldsState}
                  i={j}
                  j={i}
                  editMode={editMode}
                  isMouseDown={isMouseDown}
                  setIsMouseDown={setIsMouseDown}
                />
              ))}
            </div>
          );
        })}
      </div>
      <FieldTable fields={fieldsState} />
    </div>
  );
};

export default observer(TileGrid);
