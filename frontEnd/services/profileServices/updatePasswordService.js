
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { URL_API_BACKEND } from 'react-native-dotenv';

import validatePassword from '../commonServices/validatePasswordService.js';
import logout from '../loginServices/logoutService.js'

export default async ({
    currentPasswordValue,
    newPasswordValue,
    confirmNewPasswordValue,
    setCurrentPasswordErrors,
    setNewPasswordErrors,
    setConfirmNewPasswordErrors,
    user,
    setloading,
    setCurrentPage,
}) => {
  
    setloading(true);

    try {

        const currentPasswordErros = validatePassword(currentPasswordValue)
        const newPasswordErrors = validatePassword(newPasswordValue)
        
        setCurrentPasswordErrors(currentPasswordErros[0])
        setNewPasswordErrors(newPasswordErrors[0])
        if (newPasswordValue !== confirmNewPasswordValue){
            setConfirmNewPasswordErrors(`● Confirmation must match the new password!`)
        }else{
            setConfirmNewPasswordErrors(``)   
        }
        
        if(
            currentPasswordErros.length > 0 ||
            newPasswordErrors.length > 0 ||
            newPasswordValue !== confirmNewPasswordValue
        ){

            setloading(false)
            return

        }else{

            console.log('aqui vou mudar a senha');
            
        }

    } catch (error) {
        console.error(error);
        //logout({...{setloading, setCurrentPage, }});
    }
    
    setloading(false);
    return;

};