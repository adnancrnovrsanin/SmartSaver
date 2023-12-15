import { useEffect, useState } from "react";

interface TileProps {
  value: number;
  editMode: boolean;
  tileValue: number;
  i: number;
  j: number;
  fields: any;
  isMouseDown: boolean;
  setIsMouseDown: any;
}

const Tile = ({
  value,
  editMode,
  tileValue,
  i,
  j,
  fields,
  isMouseDown,
  setIsMouseDown,
}: TileProps) => {

  let [tip, setTip] = useState("bg-slate-300");
  const [mouseEntered, setMouseEntered] = useState(false);

  useEffect(() => {
    if (value === 0) {
      setTip("bg-slate-100");
    } else if (value === 1) {
      setTip("bg-slate-600");
    } else if (value === 2) {
      setTip("bg-orange-400");
    }
  }, [value]);

  useEffect(() => {
    if (editMode) {
      if (isMouseDown && mouseEntered) {
        fields[i][j] = tileValue;
        value = tileValue;
        if (value === 0) {
          setTip("bg-slate-100");
        } else if (value === 1) {
          setTip("bg-slate-600");
        } else if (value === 2) {
          setTip("bg-orange-400");
        }
      }
    }
  }, [mouseEntered, isMouseDown]);

  return (
    <div
      className={`tile w-9 h-9 ${editMode && "border"} ${tip} `}
      // onClick={}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
    ></div>
  );
};

export default Tile;
