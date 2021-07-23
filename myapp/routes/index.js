var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();


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

module.exports = router;
