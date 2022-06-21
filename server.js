// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = new express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8070;

const server = app.listen(port, console.log(`server is running on http://localhost:${port}`));



// retrive all projectData object
app.get('/allData',(req,resp)=>{
    resp.send(projectData);
});


// posting data on server endpoint
app.post('/postData',(req,resp)=>{

    // destructing data to new vars and add them to projectData Object;
    const {newDate,temp,feelings}=req.body;
projectData = {
    newDate,
    temp,
    feelings,
};

resp.end();

});