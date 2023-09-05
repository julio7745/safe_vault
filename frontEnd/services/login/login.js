

import validateForm from './validateForm'

export default login = (user, password, setcurrentPage, setId, setUserErrors, setPasswordErrors ) => {

    const login = validateForm(user, password)

    setUserErrors(login.userErrors || [])
    setPasswordErrors(login.passwordErrors || [])

    console.log(setUserErrors);

   if (!login.userErrors && !login.passwordErrors){
    console.log('pedido');
    const login = async (name, lastName, password) => {
        try {
          const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              lastName,
              password,
            }),
          });
      
          if (!response.ok) {
            throw new Error('Erro de rede ou servidor');
          }
      
          const data = await response.json();
      
          // A resposta do servidor deve conter o token JWT ou outros dados relevantes
          const token = data.token;
      
          // Faça o que você precisa com o token (armazene, redirecione, etc.)
          console.log('Token JWT obtido:', token);
        } catch (error) {
          console.error('Erro durante o login:', error);
          // Trate o erro conforme necessário (exiba uma mensagem de erro, etc.)
        }
      };
      
      // Exemplo de uso:
      login('julio', 'carvalho', '123456Aa');      
   }

    return
}