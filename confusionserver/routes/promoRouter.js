const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');
const promoRouter = express.Router();
const authenticate = require('../authenticate')
const cors = require('./cors');


promoRouter.use(bodyParser.json());
promoRouter.route('/')
.options(cors.corsWithOptions, (req,res) => {res.sendStatus(200)})
.get(cors.cors,(req,res,next) => {
    Promotions.find({})
    .then((promos) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promos)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Promotions.create(req.body)
    .then((promos) =>
    {
        console.log('promo created', promos)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promos)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Promotions.remove({})
    .then ((promos) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promos)
    }, (err) => next(err))
    .catch((err) => next(err));
});






promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promos) =>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promos)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode=403;
    res.end('Post operation not supported on /promotions/?');
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {new: true})
    .then((promos) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promos)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then ((promos) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promos)
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promoRouter
