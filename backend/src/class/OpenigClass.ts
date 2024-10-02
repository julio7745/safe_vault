
import dotenv from 'dotenv';
dotenv.config();

import OpeningModel from '../models/OpeningModel';

interface openingInterface {
	name: string,
	lastName: string,
	month: string,
	minute: number,
	year: number,
	hour: number,
	day: number,
}

class OpenigClass {

	private name: string
	private lastName: string

	private date: Date

	private openingData: openingInterface

	list: openingInterface[]

	constructor(

		{ name, lastName }: 
		{ name: string, lastName: string }) {

		this.name = name
		this.lastName = lastName

		this.date = new Date()

		this.openingData = {
			name: this.name,
			lastName: this.lastName,
			month: this.date.toLocaleString('en-US', { month: 'long' }),
			minute: this.date.getMinutes(),
			year: this.date.getFullYear(),
			hour: this.date.getHours(),
			day: this.date.getDate(),
		}

		this.list = []

	};

	async create(){

		const newOpening = new OpeningModel(this.openingData)
		await newOpening.save();

	}

	async delete({_id}:{_id:string}){

		await OpeningModel.findOneAndRemove({ _id });

	}

	async clear(){

		await OpeningModel.deleteMany();

	}

	async getAll(){

		await OpeningModel.find()
		.then((result: openingInterface[]) => {
			this.list = result
		})

	}

}

export default OpenigClass