import { IUser } from './authTypes'

export type ICreatePost = {
	text: string | undefined
	imageUrl: string
}

export type IPost = {
	text: string
	imageUrl: string
	user: IUser
	_id: string
	comments: []
	tags: []
	createdAt: string & Date
	likeCount: number
	like: boolean
	likeBoolean: boolean
}

export type IComments = {
	text: string
	user: IUser
	post: string
	_id: string
	Date: string
	imageUrl: string
	createdAt: string
}

export type ICreateComment = {
	text: string
	imageUrl: string
}

export type ActionTypeAddComm = {
	_id: string
	comments: IComments | never
}
