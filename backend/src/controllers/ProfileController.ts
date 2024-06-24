
import { Request, Response } from 'express';

import UserClass from '../class/UserClass';

const updatePassword = async (req: Request, res: Response) => {

  try {
    
    const name = req._user.name || ''
    const lastName = req._user.lastName|| ''

    const currentPassword = req.body.currentPassword || ''
    const newPassword = req.body.newPassword || '' 
    const confirmNewPassword = req.body.confirmNewPassword || ''
    
    const user = new UserClass({name, lastName});

    await user.updatePassword({currentPassword, newPassword, confirmNewPassword});

    if(user.errors.length > 0) return res.status(401).json({ errors: user.errors });

    return res.status(200).json({ message: 'PASSWORD_UPDATED_SUCCESS' });
    
  } catch (error) {
    console.error(`LoginController.login: \n${error}`);
    return res.status(500).json({ errors: [process.env.INTERNAL_ERROR] });
  }

};

export default {
  updatePassword
}
