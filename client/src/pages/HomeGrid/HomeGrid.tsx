import React, { useState } from 'react';
import TileGrid from '../../components/tile/tileGrid'; 

const HomeGrid: React.FC = () => {
    const [rows, setRows] = useState(11);
    const [columns, setColumns] = useState(11);
    const [editMode, setEditMode] = useState(false);

    return (
        <div>
            <input
                type="number"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
            />
            <input
                type="number"
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
            />

            <div>
                <TileGrid rows={rows} columns={columns} editMode={editMode} setEditMode={setEditMode}/>
            </div>
        </div>
    );
};

export default HomeGrid;
