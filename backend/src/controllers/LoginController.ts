import { Request, Response } from 'express';

import LoginClass from '../class/LoginClass';

const login = async (req: Request, res: Response) => {

  try {

    const name = req.body.name || '' 
    const lastName = req.body.lastName || ''
    const password = req.body.password || ''
    
    const login = new LoginClass({name, lastName, password});

    await login.newLogin();

    if(login.errors.length > 0) return res.status(401).json({ errors: login.errors });

    return res.status(200).json({ token: login.token });
    
  } catch (error) {
    console.error(`LoginController.login: \n${error}`);
    return res.status(500).json({ errors: [process.env.INTERNAL_ERROR] });
  }

};

export default {
  login
}
