const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {dishRouter} = require('./routes/dishRouter');
const {dishIdRouter} = require ('./routes/dishRouter');
const {promoRouter} = require ('./routes/promoRouter');
const {promoIdRouter} = require ('./routes/promoRouter');
const {leaderRouter} = require ('./routes/leaderRouter');
const {leaderIdRouter} = require ('./routes/leaderRouter');
const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/dishes', dishRouter);
app.use('/dishes', dishIdRouter)
app.use ('/promotions', promoRouter)
app.use ('/promotions', promoIdRouter)
app.use ('/leaders', leaderRouter)
app.use('/leaders', leaderIdRouter)

const server = http.createServer(app);

server.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});