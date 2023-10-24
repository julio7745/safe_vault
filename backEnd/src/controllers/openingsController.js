
const jwt = require('jsonwebtoken');

module.exports.openings = async (req, res) => {

  try{

    // pega aberturas do banco de dados
    console.log('lidas');
    openings = [
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "_id": 1
      },
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "_id": 1
      },
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "_id": 1
      },
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "_id": 1
      },
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "_id": 1
      },
      { "day": 12,
        "month": "january",
        "year": 2023,
        "hour": 23,
        "minute": 13,
        "name": 'julio',
        "lastname": 'carvalho',
        "_id": 1
      },
      { "day": 12,
      "month": "january",
      "year": 2023,
      "hour": 23,
      "minute": 13,
      "name": 'julio',
      "lastname": 'carvalho',
      "_id": 1
    },
    { "day": 12,
      "month": "january",
      "year": 2023,
      "hour": 23,
      "minute": 13,
      "name": 'julio',
      "lastname": 'carvalho',
      "_id": 1
    },
    { "day": 12,
      "month": "january",
      "year": 2023,
      "hour": 23,
      "minute": 13,
      "name": 'julio',
      "lastname": 'carvalho',
      "_id": 1
    },
    { "day": 12,
      "month": "january",
      "year": 2023,
      "hour": 23,
      "minute": 13,
      "name": 'julio',
      "lastname": 'carvalho',
      "_id": 1
    },
    { "day": 12,
      "month": "january",
      "year": 2023,
      "hour": 23,
      "minute": 13,
      "name": 'julio',
      "lastname": 'carvalho',
      "_id": 1
    },
    { "day": 12,
      "month": "january",
      "year": 2023,
      "hour": 23,
      "minute": 13,
      "name": 'julio',
      "lastname": 'carvalho',
      "_id": 1
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

    //apaga todas aberturas 
    console.log('limpo')
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
    //apaga abertura do _id
    console.log(`apagado ${_id}`)
    const token = jwt.sign({ message: 'sucess' }, 'secretpassword');
    return res.json({ token });
    
  } catch (error) {

    console.error(error);
    const token = jwt.sign({ error }, 'secretpassword');
    return res.json({ token });

  }
}

