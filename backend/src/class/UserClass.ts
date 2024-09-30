
import bcryptjs from 'bcryptjs'

import dotenv from 'dotenv';
dotenv.config();

import UserModel from '../models/UserModel';

class UserClass {

	errors: string[]

	private name: string
	private lastName: string
	private profileImage: string
	private profileImageExtension: string

	private realPassword: string
	private currentPassword: string
	private newPassword: string
	private confirmNewPassword: string

	private newProfileImage: string
	private newProfileImageExtension: string

	constructor(

		{ name, lastName }: 
		{ name: string, lastName: string }) {

		this.name = name
		this.lastName = lastName
		this.profileImage = ''
		this.profileImageExtension = ''

		this.errors = []

		this.realPassword = ''
		this.currentPassword = ''
		this.newPassword = ''
		this.confirmNewPassword = ''

		this.newProfileImage = ''
		this.newProfileImageExtension = ''
			
	};

	async updatePassword(
		{ currentPassword, newPassword, confirmNewPassword }: 
		{ currentPassword: string, newPassword: string, confirmNewPassword: string }){

			this.currentPassword = currentPassword
			this.newPassword = newPassword
			this.confirmNewPassword = confirmNewPassword

			this.validatePassword()
			if(this.errors.length > 0) return

			const user = await UserModel.findOne({ name: this.name, lastName: this.lastName })
			
			if(!user) this.errors.push('UNAUTHORIZED')
			if(this.errors.length > 0) return

			this.realPassword = user?.password || ''

			this.verifyPassword()
			if(this.errors.length > 0) return

			const saltRounds = parseInt(process.env.SALT || '2');
			const hashedNewPassword = await bcryptjs.hash(newPassword, saltRounds);

			await UserModel.findOneAndUpdate(
				{ name: this.name, lastName: this.lastName },
				{ $set: { password: hashedNewPassword } },
				{ upsert: false, new: true }
			);

	}

	private validatePassword(){

		const regexNumbers = /[0-9]/;
		const regexUppercase = /[A-Z]/;
		const regexlowercase = /[a-z]/;

		if (this.currentPassword.length > 15 || this.currentPassword.length < 6) {
			this.errors.push('INVALID_PASSWORD_LENGHT');
		}

		if (!regexNumbers.test(this.currentPassword)){
			this.errors.push('INVALID_PASSWORD_NUMBERS');
		}

		if (!regexUppercase.test(this.currentPassword)){
			this.errors.push('INVALID_PASSWORD_CAPITAL_LETTERS');
		}

		if (!regexlowercase.test(this.currentPassword)){
			this.errors.push('INVALID_PASSWORD_LOWERCASE_LETTERS');
		}

		if (this.newPassword.length > 15 || this.newPassword.length < 6) {
			this.errors.push('INVALID_NEW_PASSWORD_LENGHT');
		}

		if (!regexNumbers.test(this.newPassword)){
			this.errors.push('INVALID_NEW_PASSWORD_NUMBERS');
		}

		if (!regexUppercase.test(this.newPassword)){
			this.errors.push('INVALID_NEW_PASSWORD_CAPITAL_LETTERS');
		}

		if (!regexlowercase.test(this.newPassword)){
			this.errors.push('INVALID_NEW_PASSWORD_LOWERCASE_LETTERS');
		}

		if (this.newPassword !== this.confirmNewPassword){
			this.errors.push('INCORRECT_CONFIRM_PASSWORD');
		}

	}

	private verifyPassword(){

		if(!bcryptjs.compareSync(this.currentPassword, this.realPassword)) {
			this.errors.push('INCORRECT_PASSWORD')
		} 

		if(bcryptjs.compareSync(this.newPassword, this.realPassword)) {
			this.errors.push('INVALID_NEW_PASSWORD')
		}

	}

	async updateProfileImage(
		{imgExtension, base64}:
		{imgExtension: string, base64: string}
	){

		this.newProfileImage = base64
		this.newProfileImageExtension = imgExtension

		const user = await UserModel.findOne({ name: this.name, lastName: this.lastName })
			
		if(!user) this.errors.push('UNAUTHORIZED')
		if(this.errors.length > 0) return

		await UserModel.findOneAndUpdate(
			{ name: this.name, lastName: this.lastName },
			{ $set: { profileImage: this.newProfileImage, profileImageExtension: this.newProfileImageExtension } },
			{ upsert: false, new: true }
		);

	}

	async loadProfileImage(){

		const user = await UserModel.findOne({ name: this.name, lastName: this.lastName })

		if(!user) this.errors.push('UNAUTHORIZED')
		else if(this.errors.length === 0) return {
			profileImage: user.profileImage,
			profileImageExtension: user.profileImageExtension
		}

	}

}

export default UserClass