const mongoose = require("mongoose");
const Quiz = require("./Backend/api/models/quiz");
const Questions = require("./Backend/api/models/question");
const Admin = require("./Backend/api/models/admin");
const User = require("./Backend/api/models/user");

const ownerSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String },

	userType: { type: String, default: "Owner" },
	email: {
		type: String,
		lowercase: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
	},
	mobileNumber: {
		type: Number,
		match: /^([7-9][0-9]{9})$/g,
	},
	password: { type: String },
	boardPosition: { type: String },
	token: {
		type: String,
	},
});

module.exports = mongoose.model("Owner", ownerSchema);
