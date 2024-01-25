
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const Opening = require('../models/OpeningModel.js');

module.exports.getAll = async (req, res) => {

  try{

    const openings = await Opening.find();
    
    const token = jwt.sign({ 
      message: 'OPENING_GET_ALL_SUCCESSFUL',
      data: {
        openings
      }
    }, process.env.SECRET);
    return res.json({ token });

  } catch (error) {
    console.error(`OpeningController.getAll: ${error}`);
    const token = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json({ token });
  };
  
};

module.exports.clear = async (req, res) => {

  try{

    const apagados = await Opening.deleteMany();

    const token = jwt.sign({ 
      message: 'OPENING_CLEAR_SUCCESSFUL',
      data: {}
    }, process.env.SECRET);
    return res.json({ token });
    
  } catch (error) {
    console.error(`OpeningController.clear: ${error}`);
    const token = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json({ token });
  };

};

module.exports.delete = async (req, res) => {

  try{

    const _id = req.params._id;
    const apagado = await Opening.findOneAndRemove({ _id });

    const token = jwt.sign({ 
      message: 'OPENING_DELETE_SUCCESSFUL',
      data: {}
    }, process.env.SECRET);
    return res.json({ token });
    
  } catch (error) {
    console.error(`OpeningController.delete: ${error}`);
    const token = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json({ token });
  };

};

module.exports.create = async (req, res) => {
  
  try {
    
    const date = new Date();
    const openingData = {
      userId: req.body.user._id,
      month: date.toLocaleString('en-US', { month: 'long' }),
      minute: date.getMinutes(),
      year: date.getFullYear(),
      hour: date.getHours(),
      day: date.getDate(),
    };

    const newOpening = new Opening(openingData);

    await newOpening.save();

    const token = jwt.sign({ message: 'OPENING_CREATE_SUCCESSFUL' }, process.env.SECRET);
    return res.json({ token });
    
  } catch (error) {
    console.error(`OpeningController.create: ${error}`);
    const token = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json({ token });
  };

};
