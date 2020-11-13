import React,{useEffect,useState} from 'react';
import './App.css';
import IOTTable from './components/IOTTable';
import LogTable from './components/LogTable';
import Map from './components/Map';
import Chart from './components/Chart';
import AppBar from './components/AppBar'
import Title from './components/Title';


function App() {

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <AppBar />
      <Map style = {{width:"50%"}}/>
      {/* <Chart/> */}
      {/* <IOTTable /> */}
      <LogTable />
    </div>
  );
}

export default App;
