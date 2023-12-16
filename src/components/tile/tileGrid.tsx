import React, { useState, useLayoutEffect } from "react";
import Tile from "./tile";
import TilePicker from "../tilePicker/tilePicker";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/store";
import { useNavigate, useParams } from "react-router-dom";
import { Field } from "@/models/home";
import { CustomH1 } from "../Typography/CustomH1";
import FieldTable from "./FieldTable"

interface TileGridProps {}

const TileGrid: React.FC<TileGridProps> = ({}) => {
  const { id } = useParams();
  const { devicesStore } = useStore();
  const { homes } = devicesStore;
  const [tileValue, setTileValue] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [rows, setRows] = useState(11);
  const [columns, setColumns] = useState(11);
  const [editMode, setEditMode] = useState(false);
  const [numActive, setNumActive] = useState(0);
  const navigate = useNavigate();
  const [fieldsState, setFieldsState] = useState(
    Array(11).fill(Array(11).fill(0))
  );

  const { setHomeMap, setCurrentHome } = devicesStore;
  let fields = fieldsState;

  useLayoutEffect(() => {
    if (id) {
      const home = homes.find((h) => h.id === id);
      setCurrentHome(id);
      if (home) {
        setRows(home.mapRowCount);
        setColumns(home.mapColumnCount);
        let polje: Number[][] = [];
        let allFields: Field[] = [];
        home.fieldRows.forEach((fr) => {
          fr.fields.forEach((f) => {
            allFields.push(f);
          });
        });
        for (let i = 0; i < allFields.length; i++) {
          let red = [];
          let redValue: Number[] = [];
          red = allFields.filter((f) => f.coordinates[0] === i);
          red.sort((a, b) => a.coordinates[1] - b.coordinates[1]);
          red.forEach((r) => redValue.push(r.value));
          allFields = allFields.filter((f) => f.coordinates[0] !== i);
          polje.push(redValue);
          if (allFields.length === 0) break;
        }
        setFieldsState(polje);
      }
    }
  }, [id]);

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

  function changeLocation(){
    navigate("/scheduler");
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
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 mr-5 rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          onClick={changeLocation}
        >
          Schedule a notification
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
                  setNumActive={setNumActive}
                  numActive={numActive}
                  editMode={editMode}
                  isMouseDown={isMouseDown}
                  setIsMouseDown={setIsMouseDown}
                />
              ))}
            </div>
          );
        })}
      </div>
      <FieldTable fields={fieldsState} numActive={numActive}/>
    </div>
  );
};

export default observer(TileGrid);
