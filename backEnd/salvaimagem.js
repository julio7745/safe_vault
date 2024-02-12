
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv').config()


const app = express();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userProfileImageSchema = new mongoose.Schema({
  idOfUser: String,
  imageBuffer: Buffer,
});

const userProfileImage = mongoose.model('userProfileImage', userProfileImageSchema);

// Configuração do multer para fazer o upload de imagens
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

// Rota para a página de upload (incluída como uma string de template)
const uploadPageHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Upload de Imagem</title>
</head>
<body>
  <h1>Upload de Imagem</h1>
  <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="image" accept="image/*">
    <input type="submit" value="Enviar Imagem">
  </form>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.send(uploadPageHTML);
});

// Rota para lidar com o upload da imagem

app.post('/upload', upload.single('image'), async (req, res) => {
  const { buffer } = req.file;

  console.log(buffer);

  try {
    const newImage = new userProfileImage({
      idOfUser: '6548e5e963d1b4c945d31e4a',
      imageBuffer: buffer,
    });

    await newImage.save(); // Aguarde a conclusão do salvamento

    console.log(`Imagem foi armazenada com sucesso no MongoDB.`);
    res.status(200).json({ message: 'Imagem armazenada com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar a imagem:', error);
    res.status(500).json({ error: 'Erro ao salvar a imagem' });
  }
});

app.listen(3000, () => {
  console.log('Servidor está ouvindo na porta 3000');
});
