import React, {useState,useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'Log ID', width: 300,hide:true },
  { field: 'IPAddress', headerName: 'IP Address', width: 300 },
  { field: 'ReqTime', headerName: 'Time', width: 500 },
  { field: 'ReqType', headerName: 'Http Type', width: 100},
  { field: 'QueryParameters', headerName: 'Http Path', width: 400},
];

export default function HTTPLogTable(props) {
  //const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() =>{
    fetch('/api/http_logs')
      .then(res => res.json())
      .then(data => {
          var data_formatted = []
          data.map(row =>{
            console.log(row.ReqTime);
            var myDate =  new Date(row.ReqTime * 1000).toLocaleDateString() + " " + new Date(row.ReqTime * 1000).toLocaleTimeString();
            data_formatted.push({...row, ReqTime: myDate});
          })
          setRows(data_formatted)
        })
      .then(() => setLoading(false));
      },[])
  return (
    <div style={{ height: 1000, width: '100%' }}>
      <DataGrid loading = {loading} rows={rows} columns={columns} pageSize={25} checkboxSelection />
    </div>
  );
}
