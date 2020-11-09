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
    const sql = 'SELECT * FROM Logs';
    connectionPool.query(sql, (error, results, fields) => {
      if (error) {
        res.status(502).json(error);
      } else {
        res.json(results);
      }
    })
})



const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
