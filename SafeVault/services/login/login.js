

import validateForm from './validateForm'

export default login = (user, password, setcurrentPage, setId, setErros) => {

    const state = validateForm(user, password,)

    if( state.err !== undefined && state.err.length > 0  ){
        setErros = state.err
        console.log(state.err);
        
    }else{
        //chama api que verifica login
        console.log('ok');
    }

    return
}