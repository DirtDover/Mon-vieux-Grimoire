const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user');
const path = require('path');

// connection à la base de donnée

mongoose.connect('mongodb+srv://benjaminmbureau:Dovakhin23@cluster0.c0qkszr.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



const app = express();

                                      // Permet la lecture du body de la req
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

                                      // Middelware pour les Headers des reqs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');            // Connection de toutes origines
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');  //Diffrentes informations dans le Header
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');      // Permets toutes ces routes
    next();
  });


  // Les différents routes de l'App
  app.use('/api/books',bookRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/files', express.static(path.join(__dirname, 'files')));     //gestion statiques des images



  

module.exports= app ;