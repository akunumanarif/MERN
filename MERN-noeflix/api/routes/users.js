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
//GET ONE USER METHOD
//GET ALL USER METHOD
//GET USER STATISTIC METHOD

module.exports = router;
