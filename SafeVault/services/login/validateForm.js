import lodash from 'lodash';

export default function validateForm(user, password) {

    const login = {}

    const userErrors = validateUser(user);
    const passwordErrors = validatePassword(password);

    if( userErrors.length === 0 && passwordErrors.length === 0 ){
        login.user = formatUser(user)
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

function validatePassword(password) {

    const err = []
    if (password.length > 15 || password.length < 6) {
        err.push(`● Must be 6 to 15 characters!`);
        return err
    }

    const regexNumbers = /[0-9]/;
    if (!regexNumbers.test(password)){
        err.push(`● Need to have numbers!`);
        return err
    }

    const regexUppercase = /[A-Z]/;
    if (!regexUppercase.test(password)){
        err.push(`● Must have capital letters!`);
        return err
    }

    const regexlowercase = /[a-z]/;
    if (!regexlowercase.test(password)){
        err.push(`● Must have lowercase letters!`);
        return err
    }

    return err;
  }
  