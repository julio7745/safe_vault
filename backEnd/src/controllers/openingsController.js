
const jwt = require('jsonwebtoken');

module.exports.openings = async (req, res) => {

  try{

    // pega aberturas do banco de dados
    openings = [
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "id": 1
      },
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "id": 1
      },
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "id": 1
      },
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "id": 1
      },
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "id": 1
      },
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "id": 1
      },
    ]
    
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

    //apaga aberturas 
    const token = jwt.sign({ message: 'sucess' }, 'secretpassword');
    return res.json({ token });
    
  } catch (error) {

    console.error(error);
    const token = jwt.sign({ error }, 'secretpassword');
    return res.json({ token });

  }
}
