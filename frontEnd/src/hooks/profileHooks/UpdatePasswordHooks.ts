
import React from 'react';

import HttpRequestHook from '../commonHooks/HttpRequestHook';

import { useLoading } from '@/contexts/LoadingContext';
import validatePasswordService from '@/services/commonSevices/ValidadePasswordServices';

export default () => {

  const httpRequestServices = HttpRequestHook()

  const { setLoading } = useLoading();

  const updatePasswordHook = {

    UpdatePasswordService: async ({
      formValue, setFormValue,
      setFormErros,
    }:{
      formValue: {
        currentPassword: string,
        newPassword: string,
        confirmNewPassword: string
      },
      setFormValue: React.Dispatch<React.SetStateAction<{currentPassword: string, newPassword: string, confirmNewPassword: string}>>,
      setFormErros: React.Dispatch<React.SetStateAction<{currentPassword: never[] | string[], newPassword: never[] | string[], confirmNewPassword: never[] | string[]}>>,
    }) => {

      setLoading(true);

      const currentPasswordErros = validatePasswordService(formValue.currentPassword)
      const newPasswordErros = validatePasswordService(formValue.newPassword)
      const confirmNewPasswordErros = formValue.newPassword !== formValue.confirmNewPassword ? [`● Confirmation must match the new password!`] : []
      if ( formValue.newPassword === formValue.currentPassword ) newPasswordErros.push(`● New password must be different from the current password!`)

      if (currentPasswordErros.length > 0 || newPasswordErros.length > 0 || confirmNewPasswordErros.length > 0) {
        setFormErros({
          currentPassword: currentPasswordErros || [],
          newPassword: newPasswordErros || [],
          confirmNewPassword: confirmNewPasswordErros || []
        })
        return setLoading(false);
      }

      await httpRequestServices.post(`profile/updatePassword`, {
        currentPassword: formValue.currentPassword,
        newPassword: formValue.newPassword,
        confirmNewPassword: formValue.confirmNewPassword
      })
      .then( () => {
        setFormValue({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        })
        setFormErros({
          currentPassword: [],
          newPassword: [],
          confirmNewPassword: ['● Password changed successfully!']
        })
      })
      .catch(error => {

        if (error.response.data.errors[0] === 'INVALID_PASSWORD_LENGHT'){
          return setFormErros({
            confirmNewPassword: [], newPassword: [],
            currentPassword: [`● Must be 6 to 15 characters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_PASSWORD_NUMBERS'){
          return setFormErros({
            confirmNewPassword: [], newPassword: [],
            currentPassword: [`● Need to have numbers!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_PASSWORD_CAPITAL_LETTERS'){
          return setFormErros({
            confirmNewPassword: [], newPassword: [],
            currentPassword: [`● Must have capital letters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_PASSWORD_LOWERCASE_LETTERS'){
          return setFormErros({
            confirmNewPassword: [], newPassword: [],
            currentPassword: [`● Must have lowercase letters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_NEW_PASSWORD_LENGHT'){
          return setFormErros({
            confirmNewPassword: [], currentPassword: [],
            newPassword: [`● Must be 6 to 15 characters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_NEW_PASSWORD_NUMBERS'){
          return setFormErros({
            confirmNewPassword: [], currentPassword: [],
            newPassword: [`● Need to have numbers!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_NEW_PASSWORD_CAPITAL_LETTERS'){
          return setFormErros({
            confirmNewPassword: [], currentPassword: [],
            newPassword: [`● Must have capital letters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_NEW_PASSWORD_LOWERCASE_LETTERS'){
          return setFormErros({
            confirmNewPassword: [], currentPassword: [],
            newPassword: [`● Must have lowercase letters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INCORRECT_CONFIRM_PASSWORD'){
          return setFormErros({
            currentPassword: [], newPassword: [],
            confirmNewPassword: [`● Confirmation must match the new password!`]
          });
        }

        else if (error.response.data.errors[0] === 'INCORRECT_PASSWORD'){
          return setFormErros({
            confirmNewPassword: [], newPassword: [],
            currentPassword: ['● Incorrect password!']
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_NEW_PASSWORD'){
          return setFormErros({
            currentPassword: [], newPassword: [],
            confirmNewPassword: [`● New password must be different from the current password!`]
          });
        }

        else {
          return setFormErros({
            currentPassword: [], newPassword: [],
            confirmNewPassword: ['● Internal Error!']
          });
        }

      })
      .finally(() => {
        setLoading(false);
      });
          
    }
  }

  return updatePasswordHook
    
};



