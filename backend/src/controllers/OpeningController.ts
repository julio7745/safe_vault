
import { Request, Response } from 'express';

import OpenigClass from '../class/OpenigClass';

const getAll = async (req: Request, res: Response) => {

  try {
    
    const name = req._user.name || ''
    const lastName = req._user.lastName|| ''
    
    const openig = new OpenigClass({name, lastName});

    await openig.getAll()

    return res.status(200).json({ message: 'OPENING_CLEAR_SUCCESSFUL', list: openig.list});
    
  } catch (error) {
    console.error(`OpeningController.getAll: \n${error}`);
    return res.status(500).json({ errors: 'INTERNAL_ERROR'});
  }

};

const clear = async (req: Request, res: Response) => {

  try {
    
    const name = req._user.name || ''
    const lastName = req._user.lastName|| ''
    
    const openig = new OpenigClass({name, lastName});

    await openig.clear()

    return res.status(200).json({ message: 'OPENING_CLEAR_SUCCESSFUL' });
    
  } catch (error) {
    console.error(`OpeningController.clear: \n${error}`);
    return res.status(500).json({ errors: 'INTERNAL_ERROR'});
  }

};

const deleteOpenig = async (req: Request, res: Response) => {

  try {
    
    const name = req._user.name || ''
    const lastName = req._user.lastName|| ''
    const _id = req.params._id;
    
    const openig = new OpenigClass({name, lastName});

    await openig.delete({_id})

    return res.status(200).json({ message: 'OPENING_DELETE_SUCCESSFUL' });
    
  } catch (error) {
    console.error(`OpeningController.deleteOpenig: \n${error}`);
    return res.status(500).json({ errors: 'INTERNAL_ERROR'});
  }

};

const createOpenig = async (req: Request, res: Response) => {

  try {
    
    const name = req._user.name || ''
    const lastName = req._user.lastName|| ''

    const openig = new OpenigClass({name, lastName});

    await openig.create()

    return res.status(200).json({ message: 'OPENING_CREATE_SUCCESSFUL' });
    
  } catch (error) {
    console.error(`OpeningController.createOpenig: \n${error}`);
    return res.status(500).json({ errors: 'INTERNAL_ERROR'});
  }

};

export default {
  getAll,
  clear,
  deleteOpenig,
  createOpenig
}
