import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../slices/authSlice'
import { postsReducer } from '../slices/postsSlice'
import { tagsReducer } from '../slices/rightBarSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		posts: postsReducer,
		tags: tagsReducer,
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
