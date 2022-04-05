const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
	sign: (userId, exp) => {
		return jwt.sign({
			exp: Math.floor(Date.now() / 1000) + parseInt(exp),
			userId: userId
		}, process.env.JWT_SECRET);
	}
};