var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var apiHandler = require('./routes/apiHandler/book/book');
var pageHandler = require('./routes/pageHandler/main/main');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));

app.use('/', pageHandler);
app.use('/api', apiHandler);

app.listen(3000, function () {
    console.log('daybook app listening on port 3000!');
});