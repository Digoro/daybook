var mongoose    = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connect successfully');
});

mongoose.connect('mongodb://localhost/daybook');
var BookSchema = new Schema({
    'author': String,
    'title': String,
    'content': String,
    'published_date': Date
});

var Book = mongoose.model('daybook', BookSchema)
module.exports = Book;