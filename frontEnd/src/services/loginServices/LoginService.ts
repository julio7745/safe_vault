

import AsyncStorage from '@react-native-async-storage/async-storage';

import httpRequestService from '../commonSevices/httpRequestService';
import validatePasswordService from '../commonSevices/ValidadePasswordServices';

export default async ({
    setCurrentPage,
    setLoading,
    setErrors,
    login
  }) => {

    setLoading(true);
    
    const validate = validateFormService({ login });
    if (validate.erros)  { 
      setErrors(validate.erros);
      setLoading(false);
      return
    }  

    await httpRequestService.post(`login`, {name: "julio", lastName: "carvalho", password:"123456aA"})
    .then(async response => {
      setErrors({ user: [], password: [] });
      await AsyncStorage.setItem('token', JSON.stringify( response.data.token ));
      await AsyncStorage.setItem('user', JSON.stringify( { 
        name: response.data.user.name, 
        lastName: response.data.user.lastName 
      }));
      setCurrentPage('home')
    })
    .catch(error => {

      if (error.response.data.errors[0] === 'INCORRECT_USER'){
        setErrors({ user: ['● User does not exist!'], password: [] });
        return setLoading(false);
      }
        
      if (error.response.data.errors[0] === 'INCORRECT_PASSWORD') {
        setErrors({ user: [], password: ['● Incorrect password!'] });
        return setLoading(false);
      }

      if (error.response.data.errors[0] === 'INTERNAL_ERROR') {
        setErrors({ user: [], password: ['● Internal Error!'] });
        return setLoading(false);
      }

      else {
        console.error(`LoginService: Chave desconhecida  --> ${error.response.data.errors[0]}`);
        setErrors({ user: [], password: ['● Internal App Error!'] });
        return setLoading(false);
      }

    })
    .finally(() => {
      setLoading(false);
    });

    return;
};

import lodash from 'lodash';

const validateFormService = function({ login }) {

  const userErros = validateUserService(login.user)
  const passwordErros = validatePasswordService(login.password)

  const erros = ({ user: userErros, password: passwordErros });
  if (userErros.length > 0 || passwordErros.length > 0 ) return {erros: erros}
        
  const formattedUser = formatUser(login.user).split('.');

  return {
    name: formattedUser[0],
    lastName: formattedUser[1],
    password: login.password
  }

}

function validateUserService(user: string) {

  const newUser = formatUser(user);
  const err: string[] = [];

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

function formatUser(user: string) {
  let newUser = lodash.deburr(user).replace(/[^\w\s.]/gi, '');
  return newUser.toLowerCase().trim()
}
