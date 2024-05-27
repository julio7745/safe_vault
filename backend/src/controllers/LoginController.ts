import { Request, Response } from 'express';
import Login from '../models/LoginModel';

const login = async (req: Request, res: Response) => {
    const login = new Login(req);

    await login.newLogin();

    if(login.errors.length > 0) {
        // Aqui você pode lidar com os erros, por exemplo, retornando uma resposta com o erro
        return res.status(400).json({ errors: login.errors });
    }

    // Se não houver erros, você pode retornar uma resposta de sucesso, por exemplo:
    return res.status(200).json({ message: 'Login bem-sucedido!' });
};

export default {
  login
}
