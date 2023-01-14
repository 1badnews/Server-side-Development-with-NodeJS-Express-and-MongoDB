const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');
const leaderRouter = express.Router();
const authenticate = require('../authenticate');



leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.get((req,res,next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(leaders)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next) => {
    Leaders.create(req.body)
    .then((leaders) =>
    {
        console.log('promo created', leaders)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(leaders)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser,(req,res,next) => {
    Leaders.remove({})
    .then ((leaders) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(leaders)
    }, (err) => next(err))
    .catch((err) => next(err));
});






leaderRouter.route('/:leadersId')
.get((req,res,next) => {
    Leaders.findById(req.params.leadersId)
    .then((leaders) =>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(leaders)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next) => {
    res.statusCode=403;
    res.end('Post operation not supported on /promotions/?');
})
.put(authenticate.verifyUser,(req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leadersId, {
        $set: req.body
    }, {new: true})
    .then((leaders) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(leaders)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leadersId)
    .then ((leaders) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(leaders)
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter
