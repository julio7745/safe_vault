
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const openingSchema = new Schema({
  
    userId: { type: String, required: true },
    month: { type: String, required: true },
    minute: { type: Number, required: true },
    year: { type: Number, required: true },
    hour: { type: Number, required: true },
    day: { type: Number, required: true },

});

const Opening = mongoose.model('opening', openingSchema);

module.exports = Opening;
