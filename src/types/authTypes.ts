export type Itdo = {
	fullName: string
	email: string
	password: string
	userName: string
}

export type Ilogin = {
	userName: string
	password: string
}

export type authResponse = {
	fullName: string
	email: string
	password: string
	userName: string
	years: string
	dateOfBirth: string
}

export type IUser = {
	_id: string
	fullName: string
	email: string
	avatarUrl: string | undefined
	dateOfBirth: number
	years: string
	userName: string
	createdAt: string
	updatedAt: string
	__v: number
	location: string | undefined
	hatImage: string | undefined
	webSite: string | undefined
	about: string | undefined
	followed: boolean
	followStatus: boolean
	followCounter: number
	subscribeCounter: number
}
