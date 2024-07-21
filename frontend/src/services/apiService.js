export const apiService = {
	async registerUser(userData) {
		try {
			const response = await fetch('/api/registration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			})

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			return await response.json()
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error)
			throw error
		}
	},
}
