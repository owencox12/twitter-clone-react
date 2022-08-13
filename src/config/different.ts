import { AxiosInstance } from 'axios'

export const differentApi = (instance: AxiosInstance) => ({
	async upload(file: FormData) {
		const { data } = await instance.post('/upload', file)
		return data.url
	},
	async search(name: string) {
		const { data } = await instance.get(`/search`, { params: { name } })
		return data
	},
})
