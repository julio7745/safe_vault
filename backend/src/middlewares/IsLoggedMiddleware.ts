
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export default async (req, res, next) => {

  try{

    if (req.path !== '/login') {

      const stringToken = req.headers.authorization || ''
      if (!stringToken) return res.status(401).json({ errors: ['UNAUTHORIZED'] });

      const token = JSON.parse(stringToken);
      if (!token) return res.status(401).json({ errors: ['UNAUTHORIZED'] });
      
      jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
        if (err) return res.status(401).json({ errors: ['UNAUTHORIZED'] });
        req._user = { name: decoded.name, lastName: decoded.lastName } 
        next();
      });

    }else{
      next();
    }

  } catch (error) {
    console.error(`IsLoggedMiddleware: \n${error}`);
    return res.status(500).json({ errors: ['INTERNAL_ERROR'] });
  }

};
