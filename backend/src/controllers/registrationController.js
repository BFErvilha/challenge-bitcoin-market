const registrationService = require('../services/registrationService')

const registerUser = async (req, res) => {
	try {
		const userData = req.body
		const result = await registrationService.register(userData)
		res.status(200).json({ message: 'Cadastro realizado com sucesso', data: result })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	registerUser,
}
