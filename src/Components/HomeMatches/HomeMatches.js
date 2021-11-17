import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './HomeMatches.css'

const columns = [
    // {
    //     field: 'id',
    //     headerName: 'ID'
    // },
    {
        field: 'score',
        flex: 1,
        headerName: 'Score',
    },
    {
        field: 'teamName',
        flex: 1,
        headerName: 'Team Name',
    },
    {
        field: 'date',
        flex: 1,
        headerName: 'Date',
    },
    {
        field: 'support',
        flex: 1,
        headerName: 'Support',
    },
];

const rows = [
    { id: 1, teamName: 'Team 1 - Team 2', score: '35 - 21', date: '02/05/21', support: 'Twitch' },
    { id: 2, teamName: 'Team 3 - Team 4', score: '02 - 56', date: '25/10/21', support: 'Twitch' },
    { id: 3, teamName: 'Team 6- Team 5', score: '1543 - 56', date: '15/07/21', support: 'Twitch' },
    { id: 4, teamName: 'Team 3 - Team 1', score: '56 - 03', date: '19/03/20', support: 'Twitch' },
    { id: 5, teamName: 'Team 4 - Team 7', score: '98 - 62', date: '19/12/20', support: 'Twitch' },
    { id: 6, teamName: 'Team 8 - Team 1', score: null, date: '25/11/22', support: 'Twitch' },
    { id: 7, teamName: 'Team 5 - Team 7', score: '75 - 26', date: '27/09/21', support: 'Twitch' },
    { id: 8, teamName: 'Team 2 - Team 5', score: null, date: '28/12/21', support: 'Twitch' },
    { id: 9, teamName: 'Team 3 - Team 8', score: null, date: '16/01/22', support: 'Twitch' },
];

export default function DataTable() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                className="lastMatchTable"
                autoWidth={true}
                autoHeight={true}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}
