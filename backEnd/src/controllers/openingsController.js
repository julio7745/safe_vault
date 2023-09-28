
const jwt = require('jsonwebtoken');

module.exports.page = async (req, res) => {

  try{

    // verifica se o usuario não exite 
    // se sim retorna openings = {error: 'User does not exist!' }

    // pega aberturas do banco de dados
    openings = { openings: [
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "id": 1
      }
    ]}
    
    const token = jwt.sign( openings, 'secretpassword');
    res.send({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error! Please contact the developer.'});
  }
}


module.exports.clear = async (req, res) => {

  try{

    // verifica se o usuario não exite 
    // se sim retorna openings = {message: 'User does not exist!' } e sai
    const message = {message: 'User does not exist!' }

    // se não
    //apaga aberturas 
    //const message = {message: 'sucess!' }

    const token = jwt.sign( message, 'secretpassword');
    res.send({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error! Please contact the developer.'});
  }
}
