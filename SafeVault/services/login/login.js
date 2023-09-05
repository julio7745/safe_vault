

import validateForm from './validateForm'

export default login = (user, password, setcurrentPage, setId, setUserErrors, setPasswordErrors ) => {

    const login = validateForm(user, password)

    setUserErrors(login.userErrors || [])
    setPasswordErrors(login.passwordErrors || [])

   if (!login.userErrors && !login.passwordErrors){
    console.log('ok');
   }

    return
}