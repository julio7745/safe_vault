
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/UserModel');

module.exports = async (req, res, next) => {

  try{

    if (req.path !== '/login') {

      const { name, lastName, _id } = req.body.user;
      const user = await User.findOne({ name, lastName, _id });

      if (!user) {
        const token = jwt.sign({ message: 'NON_EXISTENT_USER_ERROR' }, process.env.SECRET);
        return res.json({ token });
      }

    }

  } catch (error) {
    console.error(`IsLoggedMiddleware: ${error}`);
    const token = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json({ token });
  };

  next();

};

