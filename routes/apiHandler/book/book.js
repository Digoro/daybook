var express = require('express');
var Book = require('../../../db');
var router = express.Router();

function getDayBookList(req, res){
    Book.find(function(err, books){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(books);
    })
}

router.get('/books/:id', function(req, res){
    Book.findOne({_id: req.params.id}, function(err, book){
        if(err) return res.status(500).json({error: err});
        if(!book) return res.status(404).json({error: 'book not found'});
        res.json(book);
    });
});

router.get('/books', function(req, res){
    getDayBookList(req, res);
});

router.post('/books', function(req, res){
    var book = new Book();
    book.author = "user";
    book.title = req.body.title;
    book.content = req.body.content;
    book.published_date = Date.now();

    book.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        getDayBookList(req, res);
    });
});

router.put('/books/:id', function(req, res){
    Book.findById(req.params.id, function(err, book){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!book) return res.status(404).json({ error: 'book not found' });

        if(req.body.title) book.title = req.body.title;
        if(req.body.content) book.content = req.body.content;
        if(req.body.published_date) book.published_date = Date.now();

        book.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            getDayBookList(req, res);
        });

    });
});

router.delete('/books/:id', function(req, res){
    Book.remove({_id: req.params.id}, function (err, result) {
        if(err) return res.status(500).json({ error: "database failure" });
        getDayBookList(req, res);
    });
});

module.exports = router;