var express = require('express');
var fs = require('fs');
var path = require('path');
const app = require('../app');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const { MongoClient } = require("mongodb");
var feedbackEstimate = "5th";
var username = "User";

const uri =
  "mongodb+srv://rdav:XmzffORuONFY2oey@cluster0.a3dbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);
run("",false);

async function run(doc, toAdd) {
  try {
      await client.connect();
      const database = client.db("cs350Website");
      const feedback = database.collection("userFeedback");
      // create a document to be inserted
      //const doc = { name: "tester two", address: "van down by the river", phone: "654-654-5865", email: "garbage@garbage.com", rating: "1", comment: "get good" };
      var feedbackNumber = await feedback.estimatedDocumentCount();
      feedbackEstimate = "This is the " + ordinal_suffix_of(feedbackNumber) + " piece of feedback that I've recieved, so come back soon to see how this site improves!";
      if(toAdd){
        //check if previous entry exists
        const previousFeedback = await feedback.findOne({email: doc.email});
        if(previousFeedback == null){
          const result = await feedback.insertOne(doc);
          console.log(
          `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
          );
        } else {
          console.log("PREVIOUS FEEDBACK ENTRY FOUND!");
          feedbackEstimate = "Thank you for revisiting my site. Your new feedback has been recorded. Come back soon to see how this site improves!"

          //modify previous entry
          updatedComment = "\n\n---\n\n" + doc.comment;
          const result = await feedback.updateOne(
            {email: doc.email},
            [{ $set: { comment: { $concat: [ "$comment", updatedComment ] } } }],
          )
          //edit user statement
        }
      }
  } finally {
      await client.close();
      console.log(feedbackEstimate);
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET game page. */
router.get('/games', function(req, res, next) {
  res.render('games', {title: 'Games'});
});

router.get('/feedbackresponse', function(req, res, next) {
  res.render('feedbackresponse', {title: 'Feedback Response'});
  //res.render('feedbackresponse', { data: { title: "Feedback Response", username: username, feedbackNumber: feedbackEstimate } });
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
    username = req.body.name;
    const comment = req.body.comment;
    const email = req.body.email;
    const rating = req.body.rating;
    const message = "Hello " + username + "! \n\nThanks for leaving feedback on my website! A copy of your feedback is pasted below for your reference. I hope you'll return soon to see how my site improves! \n\nThank You,\nRenee Davis @ https://cs350website.herokuapp.com/ \n\n...\n\nSite Rating: " + rating + " out of 5.\n\nYour Comment:\n \"" + comment + "\"\n\n...";
    var mailOptions = {
      from: 'naenae99rd@gmail.com',
      to: email,
      subject: 'Thanks for the Feedback!',
      text: message
    };

    var transporter=nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'naenae99rd@gmail.com',
        pass: "rd99naenae"
      }
    });

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    //calls above function that adds feedback response to database
    run(req.body,true).catch(console.dir);
    //res.send("Hello " + name + ", Thank you for subcribing. You email is " + email);

  }
  setTimeout(() => {   
    res.render('feedbackresponse', { data: { title: "Feedback Response", username: username, feedbackNumber: feedbackEstimate } });
    }, 2000);
  //res.render('feedbackresponse', { data: { title: "Feedback Response", username: username, feedbackNumber: feedbackEstimate } });
});

function ordinal_suffix_of(i) {
  var j = i % 10,
      k = i % 100;
  if (j == 1 && k != 11) {
      return i + "st";
  }
  if (j == 2 && k != 12) {
      return i + "nd";
  }
  if (j == 3 && k != 13) {
      return i + "rd";
  }
  return i + "th";
}

module.exports = router;
