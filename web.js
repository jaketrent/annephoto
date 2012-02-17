var express = require('express');

var app = express.createServer(express.logger());

app.configure(function () {
  app.use(express.logger());
  app.use(express.static(__dirname + '/static'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack:true
  }));
});
app.configure('production', function () {
  app.use(express.errorHandler());
});

app.set('views', __dirname + '/views');

app.set('view options', { layout: false });

app.register('.html', {
  compile: function(str, options){
    return function(locals){
      return str;
    };
  }
});

app.get('/', function(req, res) {
  res.render('index.html');
});

// ws endpoints
/*
app.get('/ws/fam', function (req, res) {
  res.send(fam.all)
});

app.get('/ws/fam/:id', function (req, res) {
  var person = fam.find(req.params.id);
  res.send(person)
});

app.post('/ws/fam', function (req, res) {

  var request = require('request');
  var jsdom = require('jsdom');
  var url = req.body.url;
  
  request({ uri: url }, function (error, scrapeReq, body) {
    if (error && scrapeReq.statusCode !== 200) {
      console.log('Error getting mormon.org profile: ' + url);
    }
    jsdom.env({
      html: body,
      scripts: [
        'http://code.jquery.com/jquery-1.5.min.js'
      ]
    }, function (err, window) {
      var $ = window.jQuery;
      var hiName = $('#profile-head h1').text();
      var newPerson = {
        name: hiName.substring(9),
        img: 'http://mormon.org' + $('#profile-picture img').attr('src'),
        url: url,
        tagline: $('#profile-head dl div p').text(),
        about: $('.profile-area').find('p').eq(0).text()
      };
      var id = fam.insert(newPerson);
      res.send(newPerson);
    });
  });
});

app.put('/ws/fam/:id', function (req, res) {
  var id = req.params.id;
  fam.set(id, req.body.person);
  return fam.find(id);
});*/

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});