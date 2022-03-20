// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timestamp endpoint(s)
app.get(["/api/:datetime", "/api"], (req, res) => {

  let dateObj;

  // Handling empty date parameter (This also handles /api since it wont have datetime param as well)
  if(!req.params.datetime){

    // Assign current date
    dateObj = new Date();

  }else{
    
    // Extract the datetime parameter
    let datetime = req.params.datetime;

    // Construct a regex to check if the input purely consist of digits (no dashes)
    const numRegEx = /^[0-9]*$/;
    const isNum = numRegEx.test(datetime);

    // If the input is purely made of digits, then parse it into an integer. Else pass the string as it is to the Date constructor.
    if(isNum){
      dateObj = new Date(parseInt(datetime));
    }else{
      dateObj = new Date(datetime);
    }
    
  }

  // Adding a check for Invalid Date
  if(dateObj.toString() === "Invalid Date"){

    // Return error response
    res.json({ 
      error : "Invalid Date" 
    });

  }else{

    // Return a valid response since we now have a valid date
    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toString()
    });

  }

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
