import React, { memo, useEffect } from 'react'
import { Api } from '../../config'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { getPosts, setPostsStatus } from '../../redux/slices/postsSlice'
import style from '../../styles/infoBar/infoBar.module.scss'
import { Post } from '../sideBar/post'
import { Spinner } from '../spinner/Spinner'
import { AddNewPost } from './addNewPost'

export const InfoBar: React.FC = () => {
	const { posts, status } = useAppSelector(state => state.posts)
	const dispatch = useAppDispatch()

	const loadPosts = async () => {
		try {
			dispatch(setPostsStatus(true))
			const posts = await Api().posts.getPost()
			if (!posts.length) {
				dispatch(setPostsStatus(false))
			} else {
				dispatch(getPosts(posts))
			}
		} catch (err: any) {
			alert(err.response.data.message)
		}
	}

	useEffect(() => {
		if (posts.length === 0) {
			loadPosts()
		}
	}, [])
	const postsItem = posts.map((item, index) => (
		<Post {...item} key={item._id} />
	))

	return (
		<div className={style.infobar}>
			<div className={style.infobar__title}>Главная</div>
			<>
				<AddNewPost />
			</>
			<div className={style.infobar__wrapper}>
				{status ? <Spinner /> : postsItem}
			</div>
		</div>
	)
}
