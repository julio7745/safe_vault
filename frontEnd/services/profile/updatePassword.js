
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { URL_API_BACKEND } from 'react-native-dotenv';

import validatePassword from '../common/validatePassword.js';
import logout from '../login/logout.js'

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

            //AQUI ENTRA A REQUISIÇÂO PARA TROCAR DE SENHA
            
        }

    } catch (error) {
        console.error(error);
        logout({...{setloading, setCurrentPage, }});
    }
    
    setloading(false);
    return;

};