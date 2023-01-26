const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Favorite = require('../models/favorite');

const favoritesRouter = express.Router();

favoritesRouter.use(bodyParser.json());
favoritesRouter.route('/')
.get(authenticate.verifyUser, (req,res,next) => {
    Favorite.find({"author" : req.user._id})
    .populate('author')
    .populate('dish')
    .then((favorite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    }, (err) => next(err))
    .catch((err) => next(err));
})
// damn, here we go...
.post(authenticate.verifyUser, (req,res,next) => {
    // check if user has any favorites at all, if not, create a favorite doc with author = logged in user and push a dish into it.
    Favorite.findOne({"author":req.user._id})
    .then((favorite) => {
        if (!favorite)
        {
            Favorite.create(req.body, (err, favorite) => {
                if (err) throw err;
                console.log("You have no favorites")
                favorite.author = req.user._id;
                console.log("You have no favorites2")
                favorite.dish.push(req.body._id);
                favorite.save()
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
        }
        //else, findone dish with two params, one being the author (logged in user) and the dish id that is being included in the body of the req. If there are none matching then push a dish 
        // into the user's fav dishes doc.
        // if it exists, means the user has already added this dish into its favorite list, meaning we throw error.
        else
        {
            Favorite.findOne({"dish":req.body._id,"author":req.user._id})
            .then((newfavorite) =>
            {
                if(!newfavorite)
                {
                favorite.dish.push(req.body._id);
                favorite.save()
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
                }
                else
                {
                    err = new Error('Dish with ID:  ' + favorite._id + ' is already in your list');
                    err.status = 200;
                    return next(err);
                }
            })
   
        }
    })
    
})
.delete(authenticate.verifyUser, (req,res,next) => {
    Favorite.remove({"author" : req.user._id})
    .then((favorite) => {
        res.statusCode = 200;
        res.json(favorite);
    }, (err) => next(err))
    .catch((err) => next(err));
})

favoritesRouter.route('/:dishId')
.delete(authenticate.verifyUser, (req,res,next) => {
    Favorite.findOne({"author" : req.user._id})
    .then((favorite) => {
        if(favorite){
        console.log(req.params.dishId)
        // https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
        favorite.dish.indexOf(req.params.dishId) !== -1 && favorite.dish.splice(favorite.dish.indexOf(req.params.dishId), 1);
        favorite.save();
        res.statusCode = 200;
        res.json(favorite.dish);
        }
        else {
                    err = new Error('You have no favorite document.');
                    err.status = 401;
                    return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
    }
)
module.exports = favoritesRouter