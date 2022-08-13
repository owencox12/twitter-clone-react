import { AxiosInstance } from 'axios'

export const rightBar = (instance: AxiosInstance) => ({
	async getTags() {
		const { data } = await instance.get('/popularity')
		return data
	},
	async getUsers() {
		const { data } = await instance.get('/recomendation')
		return data
	},
})
