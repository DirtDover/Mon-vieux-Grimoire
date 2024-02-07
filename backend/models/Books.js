// Utilisation des Schema de mongoose. Permet d'avoir un modèle des books qu'on veut récupérer ou créer.

const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    ratings: [
      {
        userId: {
          type: String,
          required: true,
        },
        grade: {
          type: Number,
          required: true,
        },
      },
    ],
    averageRating: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;