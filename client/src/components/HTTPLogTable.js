import React, {useState,useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DetailedHTTPRequest from './DetailedHTTPRequest'

const columns = [
  { field: 'id', headerName: 'Log ID', width: 300,hide:true },
  { field: 'IPAddress', headerName: 'IP Address', width: 300 },
  { field: 'ReqTime', headerName: 'Time', width: 400 },
  { field: 'ReqType', headerName: 'Http Type', width: 200},
  { field: 'QueryParameters', headerName: 'Http Path', width: 800},
];


export default function HTTPLogTable() {
  //const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const clickRow = (row) => {
      const idx = row.data.id;
      setModal(<DetailedHTTPRequest reqid={idx} onExit={()=> setModal(null)}/>)
  }
  useEffect(() =>{
    fetch('/api/http_logs')
      .then(res => res.json())
      .then(data => {
          var data_formatted = []
          data.map(row =>{
            var myDate =  new Date(row.ReqTime * 1000).toLocaleDateString() + " " + new Date(row.ReqTime * 1000).toLocaleTimeString();
            data_formatted.push({...row, ReqTime: myDate});
          })
          setRows(data_formatted)
        })
      .then(() => setLoading(false));
      },[])
  return (
    <div style={{ height: 1000, width: '100%' }}>
      {modal}
      <DataGrid loading = {loading} rows={rows} columns={columns} pageSize={25} onRowClick={clickRow}/>
    </div>
  );
}
