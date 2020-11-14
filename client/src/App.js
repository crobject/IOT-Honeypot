import React,{useEffect,useState} from 'react';
import './App.css';
import IOTTable from './components/IOTTable';
import LogTable from './components/LogTable';
import HTTPLogTable from './components/HTTPLogTable';
import Map from './components/Map';
import Chart from './components/Chart'
// import AppBar from './components/AppBar'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      padding: '0 5px 0 7px'
    },
  },
  inputRoot: {
    color: 'black',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));


function App() {
  const classes = useStyles();
  const [showMap,setShowMap] = React.useState(false);
  const [showHTTP,setShowHTTP] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHTTPMap = () =>{
    console.log("mooooo")
    setShowHTTP(true);
    setShowMap(true); 
    handleClose();
  }

  const handleHTTPGraph = () =>{
    setShowHTTP(true);
    setShowMap(false);   
    handleClose();
  }


  const handleFailedMap = () =>{
    setShowMap(true);
    setShowHTTP(false);
    handleClose();
  }

  const handleFailedGraph = () =>{
    setShowMap(false);
    setShowHTTP(false);
    handleClose();
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className={classes.grow}>
      <AppBar position="static" style = {{backgroundColor: '#fac420'}}>
        <Toolbar>
            <img height = '30px' src ='honeycomb.png'></img>
          <Typography className={classes.title} variant="h6" noWrap>
            Honeypot
          </Typography>
          
          <div className={classes.grow} />

          <Button variant = "outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Menu
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleFailedGraph}>SSHs Attempts</MenuItem>
            <MenuItem onClick={handleFailedMap}>SSHs Map</MenuItem>
            <MenuItem onClick={handleHTTPGraph}>Honeypot Requests</MenuItem>
            <MenuItem onClick={handleHTTPMap}>Honeypot Map</MenuItem>
          </Menu>
          <div className={classes.sectionDesktop}>
          </div>
          <div className={classes.sectionMobile}>

          </div>
        </Toolbar>
      </AppBar>
    </div>
      {(showMap && !showHTTP) && <Map mapType = "SSH"/>}
      {(!showMap && !showHTTP) && <Chart chartType="SSH"/>}
      {!showHTTP && <LogTable/>}

      {(showMap && showHTTP) && <Map mapType = "HTTP"/>}
      {(!showMap && showHTTP) && <Chart chartType="HTTP"/>}
      {showHTTP && <HTTPLogTable />}
    </div>
  );
}

export default App;
