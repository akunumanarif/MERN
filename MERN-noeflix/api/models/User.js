const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		isAdmin: { type: Boolean, default: false },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		profilPic: { type: String, default: '' }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
