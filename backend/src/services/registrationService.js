const userModel = require('../models/userModel')

const register = async userData => {
	const savedUser = await userModel.save(userData)
	return savedUser
}

module.exports = {
	register,
}
