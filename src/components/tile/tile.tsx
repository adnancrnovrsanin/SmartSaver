import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/stores/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { observer } from "mobx-react-lite";
import { CustomH2 } from "../Typography/CustomH2";

interface TileProps {
  value: number;
  editMode: boolean;
  tileValue: number;
  i: number;
  j: number;
  isMouseDown: boolean;
  setIsMouseDown: any;
  setFieldsState: any;
}

const Tile = ({
  value,
  editMode,
  tileValue,
  i,
  j,
  isMouseDown,
  setIsMouseDown,
  setFieldsState,
}: TileProps) => {
  const [tip, setTip] = useState("bg-slate-300");
  const [mouseEntered, setMouseEntered] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [powerUsage, setPowerUsage] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [type, setType] = useState("");
  const [openSecondDialog, setOpenSecondDialog] = useState(false);
  const { devicesStore } = useStore();
  const { setDevices } = devicesStore;
  useEffect(() => {
    if (value === 0) {
      setTip("bg-gray-500");
    } else if (value === 1) {
      setTip("bg-slate-600");
    } else if (value === 2) {
      setTip("bg-orange-400");
    }
  }, [value]);

  useEffect(() => {
    if (editMode && isMouseDown && mouseEntered) {
      setFieldsState((fields: any) => {
        const updatedFields = [...fields];
        updatedFields[i] = [...fields[i]];
        updatedFields[i][j] = tileValue;
        return updatedFields;
      });
      value = tileValue;
      if (value === 0) {
        setTip("bg-zinc-600");
      } else if (value === 1) {
        setTip("bg-slate-600");
      } else if (value === 2) {
        setTip("bg-orange-400");
        setIsMouseDown(false);
        setOpenDialog(true);
      }
    }
  }, [mouseEntered, isMouseDown]);

  function closeDialog(): void {
    setOpenDialog(false);
  }

  function saveData(): void {
    setDevices({
      name: name,
      manufacturer: manufacturer,
      powerUsage: Number(powerUsage),
      modelNumber: modelNumber,
      type: type,
      coordinates: [i, j],
      isOn: false,
    });
    setOpenDialog(false);
  }

  function turnDevice(e: any): void {
    e.preventDefault();
    setOpenSecondDialog(false);
  }

  return (
    <>
      <div
        className={`tile w-8 h-8  ${editMode && "border"} ${tip} `}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
        onClick={() => {
          if (!editMode && value === 2) setOpenSecondDialog(true);
        }}
      ></div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>
              <Label>Name:</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
              <Label>Manufacturer:</Label>
              <Input
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
              <Label>Power Usage:</Label>
              <Input
                value={powerUsage}
                onChange={(e) => setPowerUsage(e.target.value)}
              />
              <Label>Model Number:</Label>
              <Input
                value={modelNumber}
                onChange={(e) => setModelNumber(e.target.value)}
              />
              <Label>Type:</Label>
              <Input value={type} onChange={(e) => setType(e.target.value)} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button className="btn btn-primary" onClick={saveData}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={closeDialog}>
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openSecondDialog}
        onClose={() => setOpenSecondDialog(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Turn on/off device</DialogTitle>
            <DialogDescription>
              <CustomH2 text="Turn device on/off" />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button className="btn btn-primary" onClick={turnDevice}>
              Turn
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setOpenSecondDialog(false);
              }}
            >
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default observer(Tile);
