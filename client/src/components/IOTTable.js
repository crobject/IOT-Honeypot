import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FormatUnderlined } from '@material-ui/icons';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  TableHead: {
    textDecorationLine: 'underline',
    background: '#e8e8e8',
  },
  paper: {
    background: 'white',
    color: 'black',
  }
});

export default function IOTTable() {
  const classes = useStyles();
  const [rowsTest, setRowsTest] = useState([]);
  useEffect(() =>{
    fetch('/api/IOT')
      .then(res => res.json())
      .then(data => setRowsTest(data));
  },[]) 
  return (
    <TableContainer className = {classes.paper} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.TableHead}>
          <TableRow>
            <TableCell id = "" >Device Name</TableCell>
            <TableCell align="right">IP Address</TableCell>
            <TableCell align="right">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsTest.map((row) => (
            <TableRow key={row.device}>
              <TableCell component="th" scope="row">
                {row.device}
              </TableCell>
              <TableCell align="right">{row.ipAddress}</TableCell>
              <TableCell align="right">{Date(parseInt('1602316584')).toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
