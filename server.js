var express = require('express');

const app = express();

//var app = express();
app.use('/static', express.static(__dirname+ "/public"));


app.get('/book', (req, res) => {
    //console.log(__dirname);
    res.sendFile(__dirname + '/book.html');
})

app.listen(3000, (err) => {
    if (err) return console.log(err);
    console.log("The server is listening on port 3000");
  });