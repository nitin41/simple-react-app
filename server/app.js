// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const uuid = require('uuid');
const app = express();

var PouchDB = require('pouchdb-node');
var db = new PouchDB('mydb');

var fs = require("fs");


const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/images', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    res.send(JSON.stringify({status: 'OK', images: result.rows}));
  }).catch(function (err) {
    console.log(err);
  });
});

app.post('/uploadImage', (req, res) => {
  const id = uuid();
  const name = id + '.jpeg';
  //var buffer = Buffer.from(req.body.file.split(';base64,')[1], 'base64');
  const file = fs.openSync(path.resolve(__dirname, 'images', name), 'w');
  fs.writeFileSync(file, req.body.file.split(';base64,')[1], {encoding: 'base64'});
  fs.close(file);

  var doc = {
    "_id": id,
    "image": name
  };
  db.put(doc);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({status: 'OK', fileName: name}));
})
// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});



module.exports = app;
