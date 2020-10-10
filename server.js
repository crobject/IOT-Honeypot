const express = require('express');

const app = express();

app.get('/api/IOT', (req, res) =>{
    //replace with query results from the database
    const IOT = [
        {device: 'Netgear', ipAddress: '192.0.0.0', epochTime: '1602315374'},
        {device: 'Tenda', ipAddress: '128.0.0.0', epochTime: '1602315400'},
        {device: 'Bob\'s iPhone', ipAddress: '0.0.0.0', epochTime: '1602315543'}
    ]; //moo
    console.log('MOOOOOO')
    res.json(IOT);
})




const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));