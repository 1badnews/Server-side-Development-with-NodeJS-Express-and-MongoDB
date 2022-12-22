const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');
const leaderRouter = express.Router();




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
.post((req,res,next) => {
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
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req,res,next) => {
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
.post((req,res,next) => {
    res.statusCode=403;
    res.end('Post operation not supported on /promotions/?');
})
.put((req,res,next) => {
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
.delete((req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leadersId)
    .then ((leaders) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(leaders)
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter
