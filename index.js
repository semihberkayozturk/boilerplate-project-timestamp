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

app.get("/api/", (req, res) => {
    resObject["unix"] = new Date().getTime();
    resObject["utc"] = new Date().toUTCString();

    res.json(resObject);
});

app.get("/api/timestamp/:date", (req, res) => {
    let date = req.params.date;
    if (date.includes('-')) {
        resObject["unix"] = new Date(date).getTime();
        resObject["utc"] = new Date(date).toUTCString();
    } else {
        date = parseInt(date);
        resObject["unix"] = new Date(date).getTime();
        resObject["utc"] = new Date(date).toUTCString();
    }

    if (!resObject["unix"] || !resObject["utc"]) {
        res.json({ error: "Invalid Date" });
    }
    res.json(resObject);
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});