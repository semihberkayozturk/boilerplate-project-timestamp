// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:time", (req, res) => {
    const new_time = req.params.time;
    let toDate = Date.parse(new_time) ? new Date(new_time) : new Date(Number(new_time));
    let unix = toDate.getTime();
    let utc = toDate.toUTCString();
    if (toDate == 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }
    res.json({ unix: unix, utc: utc });
});

app.get("/api", (req, res) => {
    const new_time = new Date();
    let unix = new_time.getTime();
    let utc = new_time.toUTCString();
    res.json({ unix: unix, utc: utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});