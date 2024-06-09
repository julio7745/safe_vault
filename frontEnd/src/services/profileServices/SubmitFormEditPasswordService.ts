

// import validatePasswordService from '../commonServices/validatePasswordService.js';

// export default async ({
//     formValue, setFormValue,
//     user,
//     setLoading,
//     setformErros,
//   }) => {
  


//     try {

//       const currentPasswordErros = validatePasswordService(formValue.currentPassword)
//       const newPasswordErros = validatePasswordService(formValue.newPassword)
//       const confirmNewPasswordErros = 
//         formValue.newPassword !== formValue.confirmNewPassword ? [`● Confirmation must match the new password!`] : (
//           formValue.confirmNewPassword === formValue.currentPassword ? [`● Confirmation must be different from the current password!`] : []
//         )

//       setformErros({
//           currentPassword: currentPasswordErros[0],
//           newPassword: newPasswordErros[0],
//           confirmNewPassword: confirmNewPasswordErros[0]
//       })
        
//       if (
//         currentPasswordErros.length === 0  &&
//         newPasswordErros.length === 0  &&
//         confirmNewPasswordErros.length === 0 ) {

//         const response = await axios.post(`${URL_API_BACKEND}/password/update/${user._id}`,  { data: {...formValue}, user });

//         const message = await jwtDecode(response.data.token).message;
//         const data = await jwtDecode(response.data.token).data;

//         // tratamento para NON_EXISTENT_USER_ERROR 
//         // tratamento para GERAL_ERROR 
        
//         if ( message === 'INCORRECT_PASSWORD_ERROR' ) setformErros({
//           currentPassword: '● Incorrect password!',
//           newPassword: '',
//           confirmNewPassword: ''
//         });

//         if ( message === 'PASSWORD_UPDATE_SUCCESSFUL' ) {
//           setFormValue({
//             currentPassword: '',
//             newPassword: '',
//             confirmNewPassword: ''
//           })
//           setformErros({
//             currentPassword: '',
//             newPassword: '',
//             confirmNewPassword: '● Password changed successfully!'
//           })
//         }
        
//       }
          
//     } catch (error) {
//         console.error(error);
//     }
    
//     setLoading(false);
//     return;

  // formValue.confirmNewPassword === formValue.currentPassword ? [`● Confirmation must be different from the current password!`] : 

// };

import validatePasswordService from "../commonSevices/ValidadePasswordServices";

export default async ({
  formValue,
  setFormValue,
  setLoading,
  setformErros,
}:{
  formValue: {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  },
  setFormValue:React.Dispatch<React.SetStateAction<unknown>>,
  setLoading:React.Dispatch<React.SetStateAction<boolean>>,
  setformErros:React.Dispatch<React.SetStateAction<unknown>>,
}) => {

  setLoading(true);

  const currentPasswordErros = validatePasswordService(formValue.currentPassword)
  const newPasswordErros = validatePasswordService(formValue.newPassword)
  const confirmNewPasswordErros = formValue.newPassword !== formValue.confirmNewPassword ? [`● Confirmation must match the new password!`] : []
  if ( formValue.newPassword === formValue.currentPassword ) newPasswordErros.push(`● New password must be different from the current password!`)

  if (currentPasswordErros.length > 0 || newPasswordErros.length > 0 || confirmNewPasswordErros.length > 0) {
    setformErros({
      currentPassword: currentPasswordErros[0] || "",
      newPassword: newPasswordErros[0] || "",
      confirmNewPassword: confirmNewPasswordErros[0] || ""
    })
    return setLoading(false);
  }

  return setLoading(false);

};
