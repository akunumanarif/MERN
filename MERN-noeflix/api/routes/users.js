const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const verify = require('../verifyToken');
//UPDATE USER METHOD

router.put('/:id', verify, async (req, res) => {
	if (req.user.id === req.params.id || req.user.isAdmin) {
		const isNewPassword = req.body.password;
		const encryptWithAES = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
		if (isNewPassword) {
			isNewPassword = encryptWithAES;
		}
		try {
			const updateUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body
				},
				{ new: true }
			);
			res.status(200).json(updateUser);
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json('Forbidden access');
	}
});

//DELETE USER METHOD

router.delete('/:id', verify, async (req, res) => {
	if (req.user.id === req.params.id || req.user.isAdmin) {
		try {
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json('User Has been Deleted');
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("Can't Delete User, Forbidden access");
	}
});
//GET ONE USER METHOD

router.get('/find/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...info } = user._doc;
		res.status(200).json(info);
	} catch (error) {
		res.status(500).json(error);
	}
});
//GET ALL USER METHOD

router.get('/', verify, async (req, res) => {
	const query = req.query.new;
	if (req.user.isAdmin) {
		try {
			const users = query ? await User.find().sort({ _id: -1 }).limit(2) : await User.find();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json('Forbidden access, You are not an Admin');
	}
});
//GET USER STATISTIC METHOD

router.get('/stats', async (req, res) => {
	const today = new Date();
	const lastYear = today.setFullYear(today.setFullYear() - 1);

	const monsthArray = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	try {
		const data = await User.aggregate([
			{
				$project: {
					month: { $month: '$createdAt' }
				}
			},
			{
				$group: {
					_id: '$month',
					total: { $sum: 1 }
				}
			}
		]);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
