var express = require('express');
var fs = require('fs');
var path = require('path');
const app = require('../app');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');

var transporter=nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'naenae99rd@gmail.com',
    pass: "rd99naenae"
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET game page. */
router.get('/games', function(req, res, next) {
  res.render('games', {title: 'Games'});
});

/* GET feedback page. */
router.get('/feedback', function(req, res, next){
  //res.render('feedback.html', { title: 'Feedback'});
  fs.readFile('./views/feedback.html', (err, content) => {
    if(err) throw err;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(content);
  });
});

router.post('/feedback', [
  //server-side validation
  check('name', 'Empty name').trim().isLength({min:1}).escape(),
  check('email').trim().isLength({min:1}).withMessage('Empty Email').isEmail().withMessage('Invalid Email').escape(),
  check('address', 'Empty address').trim().isLength({min:1}).escape(),
  check('phone').trim().isLength({min:7}).withMessage('Phone Entry').escape(),
  check('comment', 'Empty comment').trim().isLength({min:1}).escape(),
  check('rating', 'Invalid Rating').trim().isNumeric().isLength({max:1},{min:1}),
], (req, res, next) =>  {
  //Extract the validation errors from a request
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({errors: errors.array() });
  } else {
    //send email to commenter
    const name = req.body.name;
    const comment = req.body.comment;
    const email = req.body.email;
    const rating = req.body.rating;
    const message = "Hello " + name + "! \n\nThanks for leaving feedback on my website! A copy of your feedback is pasted below for your reference. I hope you'll return soon to see how my site improves! \n\nThank You,\nRenee Davis @ https://cs350website.herokuapp.com/ \n\n...\n\nSite Rating: " + rating + " out of 5.\n\nYour Comment:\n \"" + comment + "\"\n\n...";
    var mailOptions = {
      from: 'naenae99rd@gmail.com',
      to: email,
      subject: 'Thanks for the Feedback!',
      text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    //append entry to JSON file
    const newEntry = JSON.stringify(req.body) + "\r\n";
    fs.appendFile('./feedback.json',newEntry, (err, content) => {
      if(err) throw err;
    });
  }
});

/*
app.get('/feedback', function(req,res){
  console.log(req.body);
  res.send("recieved your request!");
});
*/

/*
const express = require('express');
const { fstat } = require('fs');

app.post('/feedback', (req, res) => {
  var body = '';
  var testValidity = false;
  req.on('data', function(chunk) {
    body += chunck.toString();
  });
  req.on('end', function() {
    testValidity = ffv.validateForm(body);
    if(testValidity === true){
      var ts = Date.now();
      var parsed = qs.parse(body);
      fs.appendFile('flatfileDB.txt', convertToString(parsed, ts), function(error) {
        if (error) {
          console.log('Error writing to flatfileDB.txt file', error);
          throw error;
        }
        console.log('Wrote to flatfileDB.txt file successfully!');
      });
      sendEmail(parsed['email'].ts);
      res.writeHead(301, {'Content-Type': 'text/plain', Location: '/'});
      res.end();
    } else {
      res.writeHead(301, {'Content-Type': 'text/plain', Location: '/'});
      res.end(testValidity);
    }
  });
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const comments = req.body.comments;
    res.end();
});

app.get('/feedbackComment', function (req, res, next) {
  //validate feeback
  //send email
  next()},
  function (req, res, next){
    //save form feedback as JSON
  }
)
*/

module.exports = router;
