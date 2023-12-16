import React from "react";
import { Button } from "../ui/button";

type TilePickerProps = {
  value: number;
  setValue: (value: number) => void;
};

const TilePicker: React.FC<TilePickerProps> = ({ value, setValue }) => {
  const handleTileClick = (tileType: number) => {
    setValue(tileType);
  };

  const getTileLabel = (tileType: number) => {
    switch (tileType) {
      case 0:
        return "Empty";
      case 1:
        return "Wall";
      case 2:
        return "Electronic";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center w-screen justify-center ">
      <div className="flex gap-3">
        <Button onClick={() => handleTileClick(0)}>Empty</Button>
        <Button onClick={() => handleTileClick(1)}>Wall</Button>
        <Button onClick={() => handleTileClick(2)}>Electronic</Button>
      </div>
      <p className="mt-4">Selected Tile: {getTileLabel(value)}</p>
    </div>
  );
};

export default TilePicker;
