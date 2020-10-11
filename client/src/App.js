import React from 'react';
import './App.css';
import IOTTable from './components/IOTTable';
import Chart from './components/Chart';
import AppBar from './components/AppBar'
import Title from './components/Title';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <AppBar />
      <Chart/>
      <IOTTable />
    </div>
  );
}

export default App;
