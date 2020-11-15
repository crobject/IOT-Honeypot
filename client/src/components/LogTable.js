import React, {useState,useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'Log ID', width: 300,hide:true },
  { field: 'IPAddress', headerName: 'IP Address', width: 300 },
  { field: 'PortNumber', headerName: 'Port Number', width: 300 },
  { field: 'Username', headerName: 'Username', width: 300 },
  { field: 'AccessDate', headerName: 'Date Accessed',type:"date", width: 300},
];

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

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
                const temp = "2020 " + row.AccessDate
        	const date = new Date(temp);
		if(isValidDate(date)){
                	data_formatted.push({...row, AccessDate: date.toISOString()});
              	}
	    })
              setRows(data_formatted)
            })
          .then(() => setLoading(false));
      },[])
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid loading = {loading} rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
