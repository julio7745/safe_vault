
import { Request, Response } from 'express';

import UserClass from '../class/UserClass';

const updateImage = async (req: Request, res: Response) => {

  try {

    const name = req._user.name || ''
    const lastName = req._user.lastName|| ''

    const imgExtension = req.body.imgExtension
    const base64 = req.body.base64
    
    const user = new UserClass({name, lastName});

    await user.updateProfileImage({imgExtension, base64});
  
    if(user.errors.length > 0) return res.status(401).json({ errors: user.errors });

    return res.status(200).json({ message: 'PROFILE_IMAGE_UPDATED_SUCCESS' });
    
  } catch (error) {
    console.error(`ImageProfileController.updateImage: \n${error}`);
    return res.status(500).json({ errors: 'INTERNAL_ERROR'});
  }

};
export default {
  updateImage
}
