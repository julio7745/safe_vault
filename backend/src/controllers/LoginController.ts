
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

    return res.status(200).json({ token: login.token, user: { name: login.name, lastName: login.lastName }});
    
  } catch (error) {
    console.error(`LoginController.login: \n${error}`);
    return res.status(500).json({ errors: 'INTERNAL_ERROR'});
  }

};

const verify = (req: Request, res: Response) => res.status(200).json({ message: 'LOGIN_OK' });

export default {
  login, verify
}
