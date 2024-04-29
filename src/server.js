require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');
const path = require('path');
const userRepository = require('./repositories/UserRepository')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully");

    app.post('/users/register', async (req, res) => {
        const { username, password, email } = req.body;
        try {
          const novoUsuario = new User({
            username: username,
            password: password,
            email: email
          });
      
          await novoUsuario.save();
      
          res.status(201).json({ message: 'Usuário adicionado com sucesso' });
        } catch (error) {
          console.error('Erro ao adicionar usuário:', error);
          res.status(500).json({ message: 'Erro ao adicionar usuário' });
        }
    });

    app.get('/login', (req, res) => {
      res.sendFile(path.join(__dirname, 'views', 'index.html'));
    });
    
    app.post('/login', async (req, res) => {
      const { email } = req.body;
      const { password } = req.body; 
      try {
        const user = await userRepository.findUserByEmail(email);
        if (user) {
          if (user.password === password) {
            res.send("<script>window.location.href = 'http://127.0.0.1:5000/';</script>");
          } else {
            res.status(401).send("<script>alert('Email ou senha incorretos'); window.location.href = '/login';</script>");
          }
        } else {
          res.status(401).send("<script>alert('Email ou senha incorretos'); window.location.href = '/login';</script>");
        }
      } catch (error) {
        res.status(500).send("Erro interno do servidor");
      }
    });
    

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Database connection failed', err);
  });
