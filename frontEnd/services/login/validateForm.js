
import lodash from 'lodash';

import validatePassword from '../common/validatePassword.js'

export default function(user, password) {

    const login = {}

    const userErrors = validateUser(user);
    const passwordErrors = validatePassword(password);

    if( userErrors.length === 0 && passwordErrors.length === 0 ){
        const formattedUser = formatUser(user).split('.')
        login.name = formattedUser[0]
        login.lastName = formattedUser[1]
        login.password = password
    }else{
        login.userErrors =  [...userErrors,]
        login.passwordErrors =  [...passwordErrors,]
    }

    return login;
}


function validateUser(user) {

    const newUser = formatUser(user);
    const err = [];
  
    if (!newUser.includes('.')) {
        err.push(`● Follow the format: "Firstname.Lastname"!`);
        return err;
    }
  
    const index = newUser.indexOf('.');
    if (index === 0 || index === newUser.length - 1) {
        err.push(`● Follow the format: "Firstname.Lastname"!`);
        return err;
    }
  
    return err;
}

function formatUser(user) {
    let newUser = lodash.deburr(user).replace(/[^\w\s.]/gi, '');
    return newUser.toLowerCase().trim();
}
  