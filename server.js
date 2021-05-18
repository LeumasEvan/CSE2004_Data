const express = require('express');
const app = express();
const datastore = require('nedb');

app.listen(8081, () => {console.log('Listening to Port: 8081')});
app.use(express.static('public'));
app.use(express.json({limit:'100kb'}));

//Database for Schedule
const Sched_database = new datastore('Train_Sched_DB.db');
Sched_database.loadDatabase();

//Database for stations
const Stat_database = new datastore('Train_Stat_DB.db');
Stat_database.loadDatabase();

//Database for stops
const Stop_database = new datastore('Train_Stop_DB.db');
Stop_database.loadDatabase();




//Sending Databases asked through GET

//Send database to Table.js
app.get('/Sched', (req, res) =>{
    Sched_database.find({}, (err, data) =>{
        if (err) throw err;
        res.json(data);
        console.log('Sent Schedule');
    })
});

//Send database to Table.js
app.get('/SendStops', (req, res) =>{
    Stop_database.find({}, (err, data) =>{
        if (err) throw err;
        res.json(data);
        console.log('Sent Stops');
    })
});

//Send database to Ticket.js
app.get('/SendStats', (req, res) =>{
    Stat_database.find({}, (err, data) =>{
        if (err) throw err;
        res.json(data);
        console.log('Sent Stats');
    })
});




//Getting Databases asked through POST

//POST to get database entries: Train_Sched
app.post('/getData', (req, res) =>{
    const data = req.body;
    data.timestamp = Date.now();
    Sched_database.insert(data);
    console.log('inserted');
    res.json(data);
}); 




//POST to get database entries: Stat_Details
app.post('/StatData', (req, res) =>{
    const data = req.body;
    data.timestamp = Date.now();
    Stat_database.insert(data);
    console.log('inserted');
    res.json(data);
});



//POST to get database entries: Stop_Details
app.post('/StopData', (req, res) =>{
    const data = req.body;
    data.timestamp = Date.now();
    Stop_database.insert(data);
    console.log('inserted');
    res.json(data);
});

