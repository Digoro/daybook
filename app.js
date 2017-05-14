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

function getDayBookList(req, res){
    Book.find(function(err, books){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(books);
    })
}
app.get('/api/books', function(req, res){
    getDayBookList(req, res);
});

app.post('/api/books', function(req, res){
    var book = new Book();
    book.title = req.body.name;
    book.author = req.body.author;
    book.published_date = new Date(req.body.published_date);

    book.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        getDayBookList(req, res);
    });
});

app.listen(3000, function () {
    console.log('daybook app listening on port 3000!');
});