import express from 'express';

const app = express();

app.use('/', express.static(__dirname + '/../dist'));

app.get('/', (req, res) => {
    return res.send('index page');
});

import articles from './routes/articles';

app.use('/articles', articles);

const server = app.listen(3000, () => {
    console.log('Express listening on port 3000');
});