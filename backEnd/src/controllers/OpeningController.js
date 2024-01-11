
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const Opening = require('../models/OpeningModel.js');

module.exports.getAll = async (req, res) => {

  try{

    const openings = await Opening.find();
    
    const token = jwt.sign({ openings }, process.env.SECRET);
    return res.status( process.env.OPENING_GET_ALL_SUCCESSFUL).json({ token });

  } catch (error) {
    console.error(`OpeningController.getAll: ${error}`);
    return res.status(process.env.GERAL_ERROR);
  };
  
};

module.exports.clear = async (req, res) => {

  try{

    const apagados = await Opening.deleteMany();
    return res.status(process.env.OPENING_CLEAR_SUCCESSFUL);
    
  } catch (error) {
    console.error(`OpeningController.clear: ${error}`);
    return res.status(process.env.GERAL_ERROR);
  };

};

module.exports.delete = async (req, res) => {

  try{

    const _id = req.params._id;
    const apagado = await Opening.findOneAndRemove({ _id });
    return res.status(process.env.OPENING_DELETE_SUCCESSFUL);
    
  } catch (error) {
    console.error(`OpeningController.delete: ${error}`);
    return res.status(process.env.GERAL_ERROR);
  };

};

module.exports.create = async (req, res) => {
  
  try {
    
    const date = new Date();
    const openingData = {
      userId: req.body._id,
      month: date.toLocaleString('en-US', { month: 'long' }),
      minute: date.getMinutes(),
      year: date.getFullYear(),
      hour: date.getHours(),
      day: date.getDate(),
    };

    const newOpening = new Opening(openingData);

    await newOpening.save();

    return res.status(process.env.OPENING_CREATE_SUCCESSFUL);
    
  } catch (error) {
    console.error(`OpeningController.create: ${error}`);
    return res.status(process.env.GERAL_ERROR);
  };

};
