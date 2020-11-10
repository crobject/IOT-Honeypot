import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'Log ID', width: 300,hide:true },
  { field: 'IPAddress', headerName: 'IP Address', width: 300 },
  { field: 'Username', headerName: 'Username', width: 300 },
  { field: 'AccessDate', headerName: 'Date Accessed',type:'date', width: 300},
];
// const useStyles = makeStyles({
//     table: {
//       minWidth: 650,
//     },
//     TableHead: {
//       textDecorationLine: 'underline',
//       background: '#e8e8e8',
//     },
//     paper: {
//       background: 'white',
//       color: 'black',
//     }
//   });

export default function LogTable() {
    // const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        fetch('/api/logs')
          .then(res => res.json())
          .then(data => {
              var data_formatted = []
              data.map(row =>{
                var myDate = new Date(parseInt(row.AccessDate)*1000);
                data_formatted.push({...row, AccessDate: myDate.toISOString()});
              })
              setRows(data_formatted)
            })
          .then(() => setLoading(false));
      },[])
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid loading = {loading} rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
