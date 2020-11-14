import React, {useState,useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'Log ID', width: 300,hide:true },
  { field: 'IPAddress', headerName: 'IP Address', width: 300 },
  { field: 'Username', headerName: 'Username', width: 300 },
  { field: 'AccessDate', headerName: 'Date Accessed', width: 300},
];

const FormatDate = (readable_date) =>{
  var dateString;
  var month;
  var date;
  var time;
  var myTime = new Date(readable_date);
  console.log(myTime.getTime());
  if(myTime.getMonth() + 1 > 9){
      month = myTime.getMonth() + 1;
  }else{
      month = "0" + myTime.getMonth();
  }
  
  if(myTime.getDate() + 1 > 9){
      date = myTime.getDate();
      time = readable_date.slice(7);
  }else{
      date = "0" + myTime.getDate();
      time = readable_date.slice(6);
  }
  
  dateString = `${month}/${date} @ ${time}`
  return dateString;
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
                data_formatted.push({...row, AccessDate: FormatDate(row.AccessDate)});
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
