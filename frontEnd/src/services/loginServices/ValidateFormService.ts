
import lodash from 'lodash';

import validatePasswordService from '../commonServices/validatePasswordService.js'

export default function({
    login, setErrors
  }) {

    setErrors ({ user: validateUserService(login.user), password: validatePasswordService(login.password) });
    
    if( errors.user.length === 0 && errors.password.length === 0 ){
        
      const formattedUser = formatUser(login.user).split('.')

      return {
        name: formattedUser[0],
        lastName: formattedUser[1],
        password: login.password
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
