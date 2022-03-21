const router = require('express').Router();
const Movie = require('../models/User');
const verify = require('../verifyToken');

//CREATE NEW MOVIE METHOD

router.post('/', verify, async (req, res) => {
	if (req.user.isAdmin) {
		const newMovie = new Movie(req.body);

		try {
			const savedMovie = await newMovie.save();
			res.status(201).json(savedMovie);
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json('Forbidden access');
	}
});

// UPDATE MOVIE METHOD

router.put('/:id', verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const updatedMovie = await Movie.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body
				},
				{ new: true }
			);
			res.status(200).json(updatedMovie);
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json('Forbidden access');
	}
});

// DELETE MOVIE METHOD

router.put('/:id', verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			await Movie.findByIdAndDelete(req.params.id);
			res.status(200).json('Movie Has been Deleted');
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json('Forbidden access');
	}
});

// GET MOVIE METHOD

router.put('/:id', verify, async (req, res) => {
	try {
		const getMovie = await Movie.findById(req.params.id);
		res.status(200).json(getMovie);
	} catch (error) {
		res.status(500).json(error);
	}
});

// GET RANDOM MOVIE METHOD

router.put('/random', verify, async (req, res) => {
	try {
		const type = req.query.type;
		let movie;
		if (type === 'series') {
			movie = await Movie.aggregate([ { $match: { $isSeries: true } }, { $sample: { size: 1 } } ]);
		} else {
			movie = await Movie.aggregate([ { $match: { $isSeries: false } }, { $sample: { size: 1 } } ]);
		}
		res.status(200).json(movie);
	} catch (error) {
		res.status(500).json(error);
	}
});
