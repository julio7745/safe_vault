

import HttpRequestHook from '../commonHooks/HttpRequestHook';

import { useCurrentPage } from '@/contexts/CurrentPageContext';
import { useLoading } from '@/contexts/LoadingContext';
import validatePasswordService from '@/services/commonSevices/ValidadePasswordServices';

validatePasswordService

export default () => {

  const httpRequestServices = HttpRequestHook()

  const { setCurrentPage } = useCurrentPage();
  const { setLoading } = useLoading();

  const updatePasswordHook = {

    UpdatePasswordService: async ({
      formValue, setFormValue,
      setLoading,
      setformErros,
    }:{
      formValue: {
        currentPassword: string,
        newPassword: string,
        confirmNewPassword: string
      },
      setFormValue: React.Dispatch<React.SetStateAction<unknown>>,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      setformErros: React.Dispatch<React.SetStateAction<unknown>>,
    }) => {

      setLoading(true);

      const currentPasswordErros = validatePasswordService(formValue.currentPassword)
      const newPasswordErros = validatePasswordService(formValue.newPassword)
      const confirmNewPasswordErros = formValue.newPassword !== formValue.confirmNewPassword ? [`● Confirmation must match the new password!`] : []
      if ( formValue.newPassword === formValue.currentPassword ) newPasswordErros.push(`● New password must be different from the current password!`)


      // ToDo
      // Ativar a validação
      // if (currentPasswordErros.length > 0 || newPasswordErros.length > 0 || confirmNewPasswordErros.length > 0) {
      //   setformErros({
      //     currentPassword: currentPasswordErros || [],
      //     newPassword: newPasswordErros || [],
      //     confirmNewPassword: confirmNewPasswordErros || []
      //   })
      //   return setLoading(false);
      // }

      await httpRequestServices.post(`login`, {
        currentPasswordErros: formValue.currentPassword,
        newPassword: formValue.newPassword,
        confirmNewPassword: formValue.confirmNewPassword
      })
      .then( () => {
        setFormValue({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        })
        setformErros({
          currentPassword: [],
          newPassword: [],
          confirmNewPassword: ['● Password changed successfully!']
        })
      })
      .catch(error => {

        if (error.response.data.errors[0] === 'INCORRECT_PASSWORD'){
          return setformErros({
            confirmNewPassword: [], newPassword: [],
            currentPassword: ['● Incorrect password!']
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_NEW_PASSWORD'){
          return setformErros({
            currentPassword: [], newPassword: [],
            confirmNewPassword: [`● New password must be different from the current password!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_NEW_PASSWORD_LENGHT'){
          return setformErros({
            confirmNewPassword: [], currentPassword: [],
            newPassword: [`● Must be 6 to 15 characters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_NEW_PASSWORD_NUMBERS'){
          return setformErros({
            confirmNewPassword: [], currentPassword: [],
            newPassword: [`● Need to have numbers!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_NEW_PASSWORD_CAPITAL_LETTERS'){
          return setformErros({
            confirmNewPassword: [], currentPassword: [],
            newPassword: [`● Must have capital letters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INVALID_NEW_PASSWORD_LOWERCASE_LETTERS'){
          return setformErros({
            confirmNewPassword: [], currentPassword: [],
            newPassword: [`● Must have lowercase letters!`]
          });
        }

        else if (error.response.data.errors[0] === 'INCORRECT_CONFIRM_PASSWORD'){
          return setformErros({
            currentPassword: [], newPassword: [],
            confirmNewPassword: [`● Confirmation must match the new password!`]
          });
        }

        else {
          return setformErros({
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



