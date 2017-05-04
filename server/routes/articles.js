import express from 'express';
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res) => {
    res.send('articles page');
});

router.get('/read/:id', (req, res) => {
   res.send('Yor are reading article ' + req.params.id);
});

export default router;