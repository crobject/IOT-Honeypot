const express = require('express');

const app = express();

app.get('/api/IOT', (req, res) =>{
    //replace with query results from the database
    const IOT = [
        {device: 'Netgear'},
        {device: 'Tenda'},
        {device: 'Bob\'s iPhone'}
    ]; //moo

    res.json(IOT);
})




const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));