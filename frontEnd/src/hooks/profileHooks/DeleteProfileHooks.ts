

import React from 'react';

import HttpRequestHook from '@/hooks/commonHooks/HttpRequestHook';
import LoginHook from '@/hooks/loginHooks/LoginHook';

import { useLoading } from '@/contexts/LoadingContext';
import validatePasswordService from '@/services/commonSevices/ValidadePasswordServices';

export default () => {

  const httpRequestServices = HttpRequestHook()
  const LoginServices = LoginHook()

  const { setLoading } = useLoading();

  const DeleteProfileHook = {

    DeleteProfileService: async ({
      formValue,
      setFormErros,
    }:{
      formValue: {
        currentPassword: string,
      },
      setFormErros: React.Dispatch<React.SetStateAction<{currentPassword: string[]}>>,
    }) => {

      setLoading(true);

      // const currentPasswordErros: string[]  = validatePasswordService(formValue.currentPassword)
      const currentPasswordErros: string[] = []

      if (currentPasswordErros.length > 0) {
        setFormErros({
          currentPassword: currentPasswordErros || []
        })
        return setLoading(false);
      }

      await httpRequestServices.post(`profile/delete`, {
        currentPassword: formValue.currentPassword,
      })
      .then( () => {
        LoginServices.logout()
      })
      .catch(error => {

        if (error.response.data.errors[0] === 'INVALID_PASSWORD_LENGHT'){
          return setFormErros({
            currentPassword: [`● Must be 6 to 15 characters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_PASSWORD_NUMBERS'){
          return setFormErros({
            currentPassword: [`● Need to have numbers!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_PASSWORD_CAPITAL_LETTERS'){
          return setFormErros({
            currentPassword: [`● Must have capital letters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_PASSWORD_LOWERCASE_LETTERS'){
          return setFormErros({
            currentPassword: [`● Must have lowercase letters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INCORRECT_PASSWORD'){
          return setFormErros({
            currentPassword: ['● Incorrect password!']
          });
        }

        else {
          return setFormErros({
            currentPassword: ['● Internal Error!']
          });
        }

      })
      .finally(() => {
        setLoading(false);
      });
          
    }
  }

  return DeleteProfileHook

};



