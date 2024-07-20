const validationMiddleware = (req, res, next) => {
	const { email, userType, name, cpf, birthDate, phone, companyName, cnpj, openingDate, password } = req.body

	if (!email || !userType) {
		return res.status(400).json({ error: 'Email e tipo de usuário são obrigatórios' })
	}

	if (userType === 'PF') {
		if (!name || !cpf || !birthDate || !phone) {
			return res.status(400).json({ error: 'Todos os campos de Pessoa Física são obrigatórios' })
		}
	} else if (userType === 'PJ') {
		if (!companyName || !cnpj || !openingDate || !phone) {
			return res.status(400).json({ error: 'Todos os campos de Pessoa Jurídica são obrigatórios' })
		}
	} else {
		return res.status(400).json({ error: 'Tipo de usuário inválido' })
	}

	if (!password) {
		return res.status(400).json({ error: 'Senha é obrigatória' })
	}

	next()
}

module.exports = validationMiddleware
