require('dotenv').config()

function validateInputRequest(req, res, next) {
    if(!req.body.text ) {
        return res.status(400).json({
           message: 'Invalid input'
        })
    } 
    return next();
}

function PostHandler(req, res, next) { 
    var aylien = require("aylien_textapi");
    var textapi = new aylien({
        application_id: process.env.APP_ID,
        application_key: process.env.APP_KEY
    });
    textapi.sentiment({
      'url': req.body.text
    }, function(error, response) {
        res.send(response)
    }); 
}

exports.validateInputRequest = validateInputRequest;
exports.PostHandler = PostHandler;