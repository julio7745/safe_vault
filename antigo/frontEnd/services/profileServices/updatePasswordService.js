
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { URL_API_BACKEND } from 'react-native-dotenv';

import validatePasswordService from '../commonServices/validatePasswordService.js';

export default async ({
    formValue, setFormValue,
    user,
    setLoading,
    setformErros,
  }) => {
  
    setLoading(true);

    try {

      const currentPasswordErros = validatePasswordService(formValue.currentPassword)
      const newPasswordErros = validatePasswordService(formValue.newPassword)
      const confirmNewPasswordErros = 
        formValue.newPassword !== formValue.confirmNewPassword ? [`● Confirmation must match the new password!`] : (
          formValue.confirmNewPassword === formValue.currentPassword ? [`● Confirmation must be different from the current password!`] : []
        )

      setformErros({
          currentPassword: currentPasswordErros[0],
          newPassword: newPasswordErros[0],
          confirmNewPassword: confirmNewPasswordErros[0]
      })
        
      if (
        currentPasswordErros.length === 0  &&
        newPasswordErros.length === 0  &&
        confirmNewPasswordErros.length === 0 ) {

        const response = await axios.post(`${URL_API_BACKEND}/password/update/${user._id}`,  { data: {...formValue}, user });

        const message = await jwtDecode(response.data.token).message;
        const data = await jwtDecode(response.data.token).data;

        // tratamento para NON_EXISTENT_USER_ERROR 
        // tratamento para GERAL_ERROR 
        
        if ( message === 'INCORRECT_PASSWORD_ERROR' ) setformErros({
          currentPassword: '● Incorrect password!',
          newPassword: '',
          confirmNewPassword: ''
        });

        if ( message === 'PASSWORD_UPDATE_SUCCESSFUL' ) {
          setFormValue({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          })
          setformErros({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '● Password changed successfully!'
          })
        }
        
      }
          
    } catch (error) {
        console.error(error);
    }
    
    setLoading(false);
    return;

};
