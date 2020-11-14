import React,{useEffect,useState} from 'react';
import './App.css';
import IOTTable from './components/IOTTable';
import LogTable from './components/LogTable';
import HTTPLogTable from './components/HTTPLogTable';
import Map from './components/Map';
import Chart from './components/Chart'
import DetailedHTTPRequest from './components/DetailedHTTPRequest'
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFailedMap = () =>{
    setShowMap(true);
    handleClose();
  }

  const handleFailedGraph = () =>{
    setShowMap(false);
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
            Failed Attempts
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleFailedGraph}>Graph</MenuItem>
            <MenuItem onClick={handleFailedMap}>Map</MenuItem>
          </Menu>
          <div className={classes.sectionDesktop}>
          </div>
          <div className={classes.sectionMobile}>

          </div>
        </Toolbar>
      </AppBar>
    </div>
      {showMap && <Map style = {{width:"50%"}}/>}
      {!showMap && <Chart/>}
      <HTTPLogTable />
      {/* <IOTTable /> */}
      {<LogTable/>}
      {/* <HTTPLogTable /> */}
    </div>
  );
}

export default App;
