
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res, next) => {

  try{

    if (req.path !== '/login') {

      // verifica se o token é válido
      // se não for, envia erro

    }

  } catch (error) {
    
    //envia erro

  };

  next();

};

