
import jwt from 'jsonwebtoken';

import bcryptjs from 'bcryptjs'

import dotenv from 'dotenv';
dotenv.config();

import loginModel from '../models/UserModel';

class LoginClass {

	name: string
	lastName: string
	
	errors: string[]
	token: string
	
	private password: string

	constructor(
			
		{ name, lastName, password }: 
		{ name: string, lastName: string, password: string }) {

		this.name = name
		this.lastName = lastName
		this.password = password

		this.errors = []
		this.token = ''

	};

	async newLogin(){

		// ToDo
		// preciso tratar e validar os dados antes de fazer a requsição

		const user = await loginModel.findOne({ name: this.name, lastName: this.lastName, deleted: false})

		// TODO: REMOVER
		console.log({name: this.name, lastName: this.lastName, deleted: false});
        console.log(user);

		if(!user) this.errors.push('INCORRECT_USER')
		if(this.errors.length > 0) return

		this.validatePassword(user?.password as string)
		if(this.errors.length > 0) return

		const token = jwt.sign({ 
			name: user?.name,
			lastName: user?.lastName 
		}, process.env.SECRET as string, { 
			expiresIn: process.env.LOGIN_DURATION || '10m'
		});

		this.token = token;

		return;
					
	}

	private validatePassword(realPassword: string){
		if(!bcryptjs.compareSync(this.password, realPassword)) {
			this.errors.push('INCORRECT_PASSWORD')
		} 
	}

}

export default LoginClass