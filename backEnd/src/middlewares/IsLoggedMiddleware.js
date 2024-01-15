
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/UserModel');

module.exports = async (req, res, next) => {

  try{

    if (req.path !== '/login') {

      const { name, lastName, _id } = req.body.login;
      const user = await User.findOne({ name, lastName, _id });

      if (!user) return res.status(process.env.ACCESS_DENIED_ERROR);

    }

  } catch (error) {
    console.error(`IsLoggedMiddleware: ${error}`);
    return res.status(process.env.GERAL_ERROR);
  };

  next();

};

