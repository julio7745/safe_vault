import lodash from 'lodash';
import { useState } from 'react';



export default function validateForm(user, password) {

    const state = {}

    const userErrors = validateUser(user);
    const passwordErrors = validatePassword(password);

    if( userErrors.length === 0 && passwordErrors.length === 0 ){
        state.user = formatUser(user)
        state.password = password
    }else{
        state.err =  [...userErrors, ...passwordErrors];
    }

    return state;
}


function validateUser(user) {

    const newUser = formatUser(user);
    const err = [];
  
    if (!newUser.includes('.')) {
        err.push(`The user must have the format: "Firstname.Lastname" !`);
        return err;
    }
  
    const index = newUser.indexOf('.');
    if (index === 0 || index === newUser.length - 1) {
        err.push(`The user must have the format: "Firstname.Lastname" !`);
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
        err.push(`The password must be between 6 and 15 characters long!`);
    }

    const regexNumeros = /[0-9]/;
    if (!regexNumeros.test(password)){
        err.push(`precisa de numeros`);
    }

    const regexMaiuscula = /[A-Z]/;
    if (!regexMaiuscula.test(password)){
        err.push(`precisa de Maiusculas`);
    }

    const regexMinuscula = /[a-z]/;
    if (!regexMinuscula.test(password)){
        err.push(`precisa de Minuscula`);
    }

    return err;
  }
  