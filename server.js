const express = require('express');
var mysql = require('mysql');
const app = express();
const dotenv_1 = require("dotenv");
dotenv_1.config();

var connectionPool = mysql.createConnection({
    name: "default",
    type: "mysql",
    host: process.env.REACT_APP_DB_HOSTNAME,
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: "Honeypot"
});

app.get('/api/IOT', (req, res) =>{
    //replace with query results from the database
    const IOT = [
        {device: 'Netgear', ipAddress: '192.0.0.0', epochTime: '1602315374'},
        {device: 'Tenda', ipAddress: '128.0.0.0', epochTime: '1602315400'},
        {device: 'Bob\'s iPhone', ipAddress: '0.0.0.0', epochTime: '1602315543'},
    ]; //moo
    console.log('/api/IOT was requested...')
    res.json(IOT);
})

app.get('/api/logs', (req, res) =>{
    const sql = 'SELECT DISTINCT IPAddress, PortNumber, Username, AccessDate FROM Logs WHERE NOT AccessDate = ".";';
    connectionPool.query(sql, (error, results, fields) => {
      if (error) {
        res.status(502).json(error);
      } else {
        // console.log(results);
        var results_formatted = []; 
        var i = 0;
        results.map((row) =>{
          results_formatted.push({...row, id:i});
          i++;
        })
        res.json(results_formatted.reverse());
      }
    })
})

app.get('/api/http_logs', (req, res) =>{
    const sql = 'SELECT * FROM HTTPRequests where Fullhttp <> ""';
    connectionPool.query(sql, (error, results, fields) => {
      if (error) {
        res.status(502).json(error);
      } else {
        // console.log(results);
        var results_formatted = []; 

        res.json(results);
      }
    })
})

app.get('/api/http_logs/:id', (req, res) =>{
    const sql = 'SELECT * FROM HTTPRequests where id=' + Number(req.params.id);
    connectionPool.query(sql, (error, results, fields) => {
      if (error) {
        res.status(502).json(error);
      } else {
        // console.log(results);
        var results_formatted = []; 

        res.json(results);
      }
    })
})

app.get('/api/chart/requestsbydays', (req, res) =>{
    const sql = 'call Honeypot.RequestByDay();';
    connectionPool.query(sql, (error, results, fields) => {
      if (error) {
        res.status(502).json(error);
      } else {
        res.json(results[0]);
      }
    })
})

app.get('/api/IPAddresses', (req, res) =>{
  // var IPArray = []
  const endpoint = "http://ip-api.com/batch"
  const sql = 'SELECT DISTINCT IPAddress FROM (SELECT IPAddress, AccessDate FROM Honeypot.Logs ORDER BY AccessDate DESC) as t LIMIT 100;';
  connectionPool.query(sql, (error, results, fields) => {
    if (error) {
      res.status(502).json(error);
    } else {
      // results.map(row =>{
      //   IPArray.push(row.IPAddress);
      // })
      res.send(results);
    }
  })
})


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
