
import jwt from 'jsonwebtoken';

import bcryptjs from 'bcryptjs'

import dotenv from 'dotenv';
dotenv.config();

import UserModel from '../models/UserModel';

class UserClass {

    name: string
    lastName: string

    errors: string[]

    constructor(

        { name, lastName }: 
        { name: string, lastName: string }) {

        this.name = name
        this.lastName = lastName

        this.errors = []
        
    };

}

export default UserClass