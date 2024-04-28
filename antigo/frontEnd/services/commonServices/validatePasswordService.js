
export default function (password) {

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