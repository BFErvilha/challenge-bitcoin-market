const save = async userData => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(userData)
		}, 1000)
	})
}

module.exports = {
	save,
}
