
import lodash from 'lodash';

import validatePasswordService from '../commonServices/validatePasswordService.js'

export default function({ props }) {

    props.setErrors ({ user: validateUserService(props.login.user), password: validatePasswordService(props.login.password) });
    
    if( props.errors.user.length === 0 && props.errors.password.length === 0 ){
        
        const formattedUser = formatUser(props.login.user).split('.')

        return {
            name: formattedUser[0],
            lastName: formattedUser[1],
            password: props.login.password
        };
    }

}


function validateUserService(user) {

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
  