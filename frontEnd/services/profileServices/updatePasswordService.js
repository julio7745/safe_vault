
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { URL_API_BACKEND } from 'react-native-dotenv';

import validatePasswordService from '../commonServices/validatePasswordService.js';

export default async ({
    formValue,
    user,
    setLoading,
    setCurrentPage,
    formErros, setformErros,
  }) => {
  
    setLoading(true);

    try {

        const currentPasswordErros = validatePasswordService(formValue.currentPassword)
        const newPasswordErros = validatePasswordService(formValue.newPassword)
        const confirmNewPasswordErros = formValue.newPassword === formValue.confirmNewPassword ? [] : [`● Confirmation must match the new password!`]

        setformErros({
            currentPassword: currentPasswordErros[0],
            newPassword: newPasswordErros[0],
            confirmNewPassword: confirmNewPasswordErros[0]
        })
        
        if (
            currentPasswordErros.length === 0  &&
            newPasswordErros.length === 0  &&
            confirmNewPasswordErros.length === 0 ) {
            console.log('oi');
        }

          
    } catch (error) {
        console.error(error);
    }
    
    setLoading(false);
    return;

};