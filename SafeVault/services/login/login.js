

import validateForm from './validateForm'

export default login = (user, password, setcurrentPage, setId, setErros) => {

    const login = validateForm(user, password,)

    if( login.err !== undefined && login.err.length > 0  ){
        setErros = login.err
    }else{
        //chama api que verifica login
        console.log('ok');
    }

    return
}