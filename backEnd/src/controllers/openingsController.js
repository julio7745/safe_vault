
const jwt = require('jsonwebtoken');

const Opening = require('../models/opening.js')

module.exports.openings = async (req, res) => {

  try{

    const openings = await Opening.find();
    
    const token = jwt.sign( { openings }, 'secretpassword');
    res.send({ token });

  } catch (error) {

    console.error(error);
    const token = jwt.sign({ error }, 'secretpassword');
    return res.json({ token });

  }
  
}

module.exports.clear = async (req, res) => {

  try{

    const apagados = await Opening.deleteMany()
    const token = jwt.sign({ message: 'sucess' }, 'secretpassword');
    return res.json({ token });
    
  } catch (error) {

    console.error(error);
    const token = jwt.sign({ error }, 'secretpassword');
    return res.json({ token });

  }

}

module.exports.delete = async (req, res) => {

  try{

    const _id = req.body.openingId;
    const apagado = await Opening.findOneAndRemove({ _id })
    const token = jwt.sign({ message: 'sucess' }, 'secretpassword');
    return res.json({ token });
    
  } catch (error) {

    console.error(error);
    const token = jwt.sign({ error }, 'secretpassword');
    return res.json({ token });

  }
}

module.exports.create = async (req, res) => {
  
  try {
    
    const date = new Date();

    const openingData = {

      name: req.body.name,
      lastName: req.body.lastName,
      day: date.getDate(),
      month: date.toLocaleString('en-US', { month: 'long' }),
      year: date.getFullYear(),
      hour: date.getHours(),
      minute: date.getMinutes(),

    };

    const newOpening = new Opening(openingData);

    await newOpening.save();

    const token = jwt.sign({ message: 'sucess' }, 'secretpassword');
    return res.json({ token });
    
  } catch (error) {
    
    console.error(error);
    const token = jwt.sign({ error }, 'secretpassword');
    return res.json({ token });

  }
};
