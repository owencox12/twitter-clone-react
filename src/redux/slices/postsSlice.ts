import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActionTypeAddComm, IPost } from '../../types/postsTypes'

type postsState = {
	posts: IPost[]
	status: boolean
}

const initialState: postsState = {
	posts: [],
	status: false,
}

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		getPosts: (state, action: PayloadAction<IPost>) => {
			state.status = false
			state.posts = state.posts.concat(action.payload)
		},
		setPostsStatus: (state, action: PayloadAction<boolean>) => {
			state.status = action.payload
		},
		createPosts: (state, action: PayloadAction<IPost>) => {
			state.posts = state.posts.concat(action.payload)
		},
		clearPosts: state => {
			state.posts = []
		},
		unFollow: (state, action: PayloadAction<string>) => {
			state.posts = state.posts.filter(obj => obj.user._id !== action.payload)
		},
		setFollow: (state, action: PayloadAction<IPost>) => {
			state.posts = state.posts.concat(action.payload)
		},
		changeLikeStatus: (state, action: PayloadAction<string>) => {
			const findItem = state.posts.find(obj => obj._id === action.payload)
			if (findItem) {
				findItem.likeBoolean = !findItem.likeBoolean
				findItem.likeBoolean
					? (findItem.likeCount = findItem.likeCount + 1)
					: (findItem.likeCount = findItem.likeCount - 1)
			}
		},
		addComments: (state, action: PayloadAction<ActionTypeAddComm>) => {
			const findItem: any = state.posts.find(
				obj => obj._id === action.payload._id
			)
			if (findItem) {
				findItem.comments.push(action.payload.comments)
			}
		},
		deletePost: (state, action: PayloadAction<string>) => {
			state.posts = state.posts.filter(obj => obj._id !== action.payload)
		},
	},
})

export const postsReducer = postsSlice.reducer

export const {
	getPosts,
	setPostsStatus,
	createPosts,
	clearPosts,
	unFollow,
	changeLikeStatus,
	addComments,
	deletePost,
	setFollow,
} = postsSlice.actions
