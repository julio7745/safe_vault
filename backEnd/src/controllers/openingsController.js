
const jwt = require('jsonwebtoken');

const Opening = require('../models/opening.js')

module.exports.get = async (req, res) => {

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

      userId: req.body.id,
      month: date.toLocaleString('en-US', { month: 'long' }),
      minute: date.getMinutes(),
      year: date.getFullYear(),
      hour: date.getHours(),
      day: date.getDate(),

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
