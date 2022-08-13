import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../types/authTypes'
import { IPost } from '../../types/postsTypes'

type ratingsPostsState = {
	tags: IPost[]
	users: IUser[]
}

const initialState: ratingsPostsState = {
	tags: [],
	users: [],
}

export const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {
		setTags: (state, action: PayloadAction<IPost[]>) => {
			state.tags = state.tags.concat(action.payload)
		},
		clearRightBar: state => {
			state.tags = []
			state.users = []
		},
		getUsers: (state, action: PayloadAction<IUser[]>) => {
			state.users = state.users.concat(action.payload)
		},
		handlerFollowStatus: (state, action: PayloadAction<string>) => {
			const findItem = state.users.find(obj => obj._id === action.payload)
			if (findItem) {
				findItem.followStatus = !findItem.followStatus
			}
		},
	},
})

export const tagsReducer = tagsSlice.reducer

export const { setTags, clearRightBar, getUsers, handlerFollowStatus } =
	tagsSlice.actions
