import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const FieldTable = ({ fields }: { fields: number[][] }) => {
  const [numOfDevices, setNumOfDevices] = useState(0);
  const [numOfWalls, setNumOfWalls] = useState(0);

  useEffect(() => {
    let numDevices = 0;
    let numWalls = 0;
    for (let i = 0; i < fields.length; i++) {
      for (let j = 0; j < fields[i].length; j++) {
        if (fields[i][j] === 2) {
          numDevices++;
        }
        if (fields[i][j] === 1) {
          numWalls++;
        }
      }
    }
    setNumOfDevices(numDevices);
    setNumOfWalls(numWalls);
    console.log(numWalls, numDevices);
  }, [fields]);

  return (
    <Table>
    <TableCaption><h1>A list of your fields</h1></TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Number of devices</TableHead>
        <TableHead>Number of walls</TableHead>
        <TableHead>In Use</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>{numOfDevices}</TableCell>
        <TableCell>{numOfWalls}</TableCell>
        <TableCell>No</TableCell>
      </TableRow>
    </TableBody>
  </Table>
  );
};

export default FieldTable;
