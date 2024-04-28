
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/UserModel');

module.exports.update = async (req, res) => {

  try {

    const idOfUser = req.params._id;
    const { currentPassword, newPassword, confirmNewPassword } = req.body.data
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOne({ _id:idOfUser });

    // Apenas para gestor
    // usuario normal será barrado no login
    // pois idOfUser será igual ao id de login
    if (!user) {
      const token = jwt.sign({ message: 'NON_EXISTENT_USER_UPDATE_ERROR' }, process.env.SECRET);
      return res.json({ token });
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      const token = jwt.sign({ message: 'INCORRECT_PASSWORD_ERROR' }, process.env.SECRET);
      return res.json({ token });
    }

    const updatedUserPassword = await User.findOneAndUpdate(
      { _id: idOfUser },
      { $set: { password: hashedNewPassword } },
      { upsert: false, new: true }
    );

    const token = jwt.sign({ message: 'PASSWORD_UPDATE_SUCCESSFUL' }, process.env.SECRET);
    return res.json({ token });
  
  } catch (error) {
    console.error(`PasswordController.update: ${error}`);
    const token = jwt.sign({ message: 'GERAL_ERROR' }, process.env.SECRET);
    return res.json({ token });
  };

};
