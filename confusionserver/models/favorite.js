const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var favoriteSchema = new Schema({
    author:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dish: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
});

var Favorites = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorites;