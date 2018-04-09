var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ejs = require('ejs');


io.origins('*:*')

io.on('connection', function (socket){

   console.log('connection');

  socket.on('buzzer', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);



    io.emit('message', {
      "from": from,
      "msg": msg
    });

  });

});

app.set('view engine', 'ejs');
app.get('/admin', function (req, res) {

    res.render('pages/admin.ejs');

});

app.get('/', function (req, res) {

	  res.render('pages/client.ejs');

});

http.listen(process.env.PORT || 3000, function () {
  console.log('listening on https://ngrk-buzzer-app.herokuapp.com: local (3000): heroku: ' + process.env.PORT);
});