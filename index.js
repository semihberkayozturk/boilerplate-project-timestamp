// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { response } = require('express');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
    res.json({ greeting: 'hello API' });
});


let resObject = {}

app.get("/api/timestamp/:input", (req, res) => {
    let input = req.params.input;
    if (input.includes('-')) {
        resObject["unix"] = new Date(input).getTime();
        resObject["utc"] = new Date(input).toUTCString();
    } else {
        input = parseInt(input);
        resObject["unix"] = new Date(input).getTime();
        resObject["utc"] = new Date(input).toUTCString();
    }

    if (!resObject["unix"] || !resObject["utc"]) {
        res.json({ error: "Invalid Date" });
    }
    res.json(resObject);
});

app.get("/api/timestamp"), (req, res) => {
    resObject["unix"] = new Date().getTime();
    resObject["utc"] = new Date().toUTCString();

    res.json(resObject);
};





// listen for requests :)
var listener = app.listen(3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});