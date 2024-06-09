
import { Request, Response } from 'express';

import UserClass from '../class/UserClass';

const getData = async (req: Request, res: Response) => {

  try {

    const {name, lastName} = req.body._user

    return res.status(200).json({ name, lastName });
    
  } catch (error) {
    console.error(`LoginController.login: \n${error}`);
    return res.status(500).json({ errors: [process.env.INTERNAL_ERROR] });
  }

};

export default {
  getData
}
