const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/Thing')


mongoose.connect('mongodb+srv://benjaminmbureau:Dovakhin23@cluster0.c0qkszr.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/books', (res, req, next)=>{
    delete req.body._id
   const thing = new Thing ({
    ...req.body
   });
thing.save()
.then(()=> res.status(201).json({message: 'Livre enregistré'}))
.catch(error => res.status(400).json({error}));
});

app.get('/api/books', (req, res, next) => {
    const books = [
      {
        _id: '1',
        title: 'Les misérables',
        author: 'Victor Hugo',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        year: 1862,
        genre: 'roman',
        userId: 'qsomihvqios',
      },
      {
        _id: '2',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
      {
        _id: '3',
        title: 'Les misérables',
        author: 'Victor Hugo',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        year: 1862,
        genre: 'roman',
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(books);
  });

  

module.exports= app ;