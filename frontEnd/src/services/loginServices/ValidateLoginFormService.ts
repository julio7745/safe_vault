
import validatePasswordService from "../commonSevices/ValidadePasswordServices";
import lodash from "lodash";

export default function (
  { login } : { 
    login: {
      user: string,
      password: string,
    } 
  }) {

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
