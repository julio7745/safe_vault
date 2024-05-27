
import mongoose from 'mongoose'

import bcryptjs from 'bcryptjs'

import dotenv from 'dotenv';
dotenv.config();

const LoginSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true}
})

const loginModel = mongoose.model('User', LoginSchema)

class Login {

    private req: Request
    private name: string
    private lastName: string
    private password: string

    private user = {}
    errors: string[]
    token: string

    constructor( req:Request ){

        this.req = req
        this.name = req.body.name
        this.lastName = req.body.lastName
        this.password = req.body.password

        this.user = {}
        this.errors = []
        this.token = ''
    };

    async newLogin(){

        this.cleanData()

        this.validateData()
        if(this.errors.length > 0) return

        try {

            const user = await loginModel.findOne({ name: this.name, lastName: this.lastName })

            if(!user ) this.errors.push('E-mail incorreto')
            if(this.errors.length > 0) return

            this.validatePassword(user.password)
            if(this.errors.length > 0) return

            this.req.session.userId = user._id;

        } catch (error) {
            this.errors.push(process.env.INTERNAL_ERROR as string)
            console.log(`LoginModel.newLogin: ${error}`);
            return
        }
           
    }

    cleanData(){
    }
    
    validateData(){}

    validatePassword(realPassword){
        if(!bcryptjs.compareSync(this.password, realPassword)) {
            this.errors.push(process.env.INCORRECT_PASSWORD as string)
        } 
    }

}

export default Login