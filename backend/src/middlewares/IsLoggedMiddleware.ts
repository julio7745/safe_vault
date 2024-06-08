
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export default async (req, res, next) => {

  try{

    if (req.path !== '/login') {

      const token = JSON.parse(req.headers.authorization) || "";
      
      if (!token) return res.status(401).json({ errors: [process.env.UNAUTHORIZED] });
      
      jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
        if (err) return res.status(401).json({ errors: [process.env.UNAUTHORIZED] });
        next();
      });

    }else{
      next();
    }

  } catch (error) {
    console.error(`IsLoggedMiddleware: \n${error}`);
    return res.status(500).json({ errors: [process.env.INTERNAL_ERROR] });
  }

};
