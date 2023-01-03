// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 }))  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port)
})

app.get('/api/:date?', function(req, res) {
  let text = req.params.date
  let date = new Date()
  if (text != null) {
    if (isNaN(text)) {
      date = new Date(text)
    } else {
      date = new Date(Number.parseInt(text))
    }
  }

  let unix = date.getTime()
  if (isNaN(unix)) {
    res.json({ error: "Invalid Date" })
  } else {
    res.json({ unix: date.getTime(), utc: date.toGMTString() })
  }
})