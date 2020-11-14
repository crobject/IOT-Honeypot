import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { FormatUnderlined } from '@material-ui/icons';

const useStyles = makeStyles({
  table: {
    minWidth: 850,
  },
  TableHead: {
    textDecorationLine: 'underline',
    background: '#e8e8e8',
  },
  paper: {
      position: 'absolute',
      width: "80%",
      margin: "auto",
      boxShadow: "#000",
      padding: "2 5 5 2",
    },
});

export default function DetailedHTTPRequest(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  useEffect(() => {
    fetch('/api/http_logs/' + props.reqid)
      .then(res => res.json())
      .then(data => setRows(data))
      .then(_ => handleOpen());
  },[]);

  const formatHttp = (http) => {
    return http.split('\t').map(el => {
       return <p>{el}</p>;
    });
  }

  return (
      <Modal
        open={open}
        onClose={props.onExit}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.paper}>
        <TableContainer className={classes.paper} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.TableHead}>
              <TableRow>
                <TableCell>IP Address</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Path</TableCell>
              </TableRow>
            </TableHead>
          {rows && rows.map((row) => (
            <TableBody>
                <TableRow key={1}>
                  <TableCell>{row.IPAddress}</TableCell>
                  <TableCell>{new Date(row.ReqTime * 1000).toString()}</TableCell>
                  <TableCell>{row.ReqType}</TableCell>
                  <TableCell>{row.QueryParameters}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <div >
                    {formatHttp(atob(row.Fullhttp))}
                </div>
            </TableBody>
          ))}
          </Table>
        </TableContainer>
      </Modal>
  );
}
