var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
var routes = require("./routes")

const app = express();
app.use(cors())
app.use(bodyParser.json())  
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static("dist"));
app.use(routes);

module.exports = app;
