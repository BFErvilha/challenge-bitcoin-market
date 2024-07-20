import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		proxy: {
			'/registration': 'http://localhost:3000',
		},
	},
})
