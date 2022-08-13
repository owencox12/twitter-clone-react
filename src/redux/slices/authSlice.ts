import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authResponse, IUser } from '../../types/authTypes'
import { IPost } from '../../types/postsTypes'
import { patchObjType } from '../../types/profileTypes'
import { RootState } from '../store/store'

type authState = {
	data: IUser | null
	status: boolean
	userPosts: IPost[]
}

const initialState: authState = {
	data: null,
	status: false,
	userPosts: [],
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.data = action.payload
			state.status = false
		},
		setStatus: (state, action: PayloadAction<boolean>) => {
			state.status = action.payload
		},
		logOut: state => {
			state.data = null
		},
		setUserPosts: (state, action: PayloadAction<IPost>) => {
			state.userPosts = []
			state.userPosts = state.userPosts.concat(action.payload)
		},
		updateProfile: (state, action: PayloadAction<patchObjType>) => {
			console.log(action.payload)
			if (state.data !== null) {
				state.data.fullName = action.payload.fullName
				state.data.about = action.payload.about
				state.data.location = action.payload.location
				state.data.hatImage = action.payload.hatImage
				state.data.webSite = action.payload.webSite
				state.data.avatarUrl = action.payload.avatarUrl
			}
		},
		changeLikeStatusUserPosts: (state, action: PayloadAction<string>) => {
			const findItem = state.userPosts.find(obj => obj._id === action.payload)
			if (findItem) {
				findItem.likeBoolean = !findItem.likeBoolean
				findItem.likeBoolean
					? (findItem.likeCount = findItem.likeCount + 1)
					: (findItem.likeCount = findItem.likeCount - 1)
			}
		},
		deleteProfilePosts: (state, action: PayloadAction<string>) => {
			state.userPosts = state.userPosts.filter(
				obj => obj._id !== action.payload
			)
		},
	},
})

export const authReducer = authSlice.reducer

export const isSelected = (state: RootState) => Boolean(state.auth.data)

export const {
	setUser,
	setStatus,
	logOut,
	setUserPosts,
	updateProfile,
	changeLikeStatusUserPosts,
	deleteProfilePosts,
} = authSlice.actions
