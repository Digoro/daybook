var express = require('express');
var app = express();
var Book = require('./db');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));
app.get('/', function (req, res) {
    res.render('index',{});
});

app.get('/api/books', function(req, res){
    Book.find(function(err, books){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(books);
    })
});

app.listen(3000, function () {
    console.log('daybook app listening on port 3000!');
});