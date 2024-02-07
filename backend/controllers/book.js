const Book = require ('../models/Books');
const Router = require('express')

//fonction d'ajout d'un nouveau book.

exports.addNewBook = (req, res, next) => {
	const bookObject = JSON.parse(req.body.book);

	const book = new Book({
		...bookObject,							// spread operator pour copier le body de la req dans un nouvel objet

		imageUrl: `${req.protocol}://${req.get('host')}/files/${
			req.file.filename.trim()								
		}`,
	});

	book.save()
		.then(() => res.status(201).json({ message: 'Objet enregistré' }))
		.catch((error) => res.status(400).json({ error }));
};

// fonction qui récupère tous les books dans la bdd
exports.findBooks = (req, res, next) => {
	Book.find()
		.then((books) => res.status(200).json(books))
		.catch((error) => res.status(400).json({ error }));
};

// fonction qui récupère un book en fonction de l'id dans l'url
exports.findBook = (req, res, next) => {
	const url = req.url;

	const urlId = url.split('/')[1];

	Book.findOne({ _id: urlId })
		.then((books) => res.status(200).json(books))
		.catch((error) => res.status(400).json({ error }));
};

// fonction qui met à jour un book.
exports.updateBook = (req, res, next) => {
	const url = req.url;
	const urlId = url.split('/')[1];
	const bookFilter = { _id: urlId };
	let updatedData;
	const checkData = () => {
		if (typeof req.body.book !== 'string') {			// si le body de la req n'est pas un string on met à jour directement
			console.log(typeof req.body.book);
			updatedData = req.body;
			return updatedData;
		} else {
			console.log(typeof req.body.book);				// sinon on trdauis en Json et on modifie l'url de l'image que l'on upload
			updatedData = JSON.parse(req.body.book);
			updatedData.imageUrl = `${req.protocol}://${req.get(
				'host'
			)}/files/${req.file.filename}`;
			return updatedData;
		}
	};

	checkData();

	const updatedBook = Book.findOneAndUpdate(bookFilter, updatedData, {
		new: true,
	})
		.then((books) => res.status(201).json(books))
		.catch((error) => res.status(400).json({ error }));
};


// fonction qui permet de supprimer un book
exports.deleteBook = (req, res, next) => {
	const url = req.url;
	const urlId = url.split('/')[1];
	const bookFilter = { _id: urlId };
	const deletedBook = Book.findOneAndDelete(bookFilter, {
		new: true,
	})
		.then((books) => res.status(201).json(books))
		.catch((error) => res.status(400).json({ error }));
};

// fonction qui trie les books en fonction de leurs notes et qui les affichent sur la homepage
exports.bookBestRating = (req, res, next) => {
	Book.find()
		.sort({ averageRating: 'desc' })
		.then((books) => res.status(200).json(books.splice(0, 3)))
		.catch((error) => res.status(400).json({ error }));
};

// fonction qui permet d'ajouter une note a un book seulement si le user ne l'a pas fait avant
exports.rateBook = (req, res, next) => {
	const url = req.url;
	const urlId = url.split('/')[1];
	const bookFilter = { _id: urlId };
	const updatedUserId = req.body.userId;
	const updatedGrade = req.body.rating;

	const updatedData = {
		userId: updatedUserId,
		grade: updatedGrade,
	};

	Book.findOneAndUpdate(
		bookFilter,
		{ $push: { ratings: updatedData } },
		{ new: true }
	)
		.then((updatedBook) => {
			const totalRatings = updatedBook.ratings.length;
			const ratingsSum = updatedBook.ratings.reduce(
				(acc, rating) => acc + rating.grade,					// ajout de la nouvelle note
				0
			);
			updatedBook.averageRating = ratingsSum / totalRatings;		// moyenne des différents notes du book

			return updatedBook.save();
		})
		.then((book) => {
			res.status(200).json(book);
		})
		.catch((error) => res.status(400).json({ error }));
};