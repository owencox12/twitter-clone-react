import React, { memo, useEffect, useState } from 'react'
import style from '../../styles/postpage/postpage.module.scss'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { AiTwotoneMessage, AiFillHeart } from 'react-icons/ai'
import { BiRepost } from 'react-icons/bi'
import { FiShare } from 'react-icons/fi'
import { Comments } from './comments'
import { NewComm } from './addNewComm'
import { IComments, IPost } from '../../types/postsTypes'
import { Api } from '../../config'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Spinner } from '../spinner/Spinner'
import { format } from 'date-fns'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { changeLikeStatus } from '../../redux/slices/postsSlice'

export const PostPage: React.FC = () => {
	const { id } = useParams()
	const { posts, status } = useAppSelector(state => state.posts)
	const findPost = posts.find(obj => obj._id === id)
	const [user, setUser] = useState(findPost)
	const [commentsItem, setCommentsItem] = useState<IComments[]>([])
	const [isLoading, setLoading] = useState<boolean>(true)
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useAppDispatch()
	const CommentsMemo = memo(Comments)

	const loadComments = async () => {
		try {
			const comments = await Api().comments.getComms(id!)
			setCommentsItem(comments)
			setLoading(false)
		} catch (err) {
			alert('Не удалось загрузить комментарии')
			setLoading(false)
		}
	}

	const findPostEmpty = async () => {
		if (findPost === undefined) {
			const userPost = await Api().posts.getOnePost(id!)
			setUser(userPost)
		}
	}

	useEffect(() => {
		loadComments()
		findPostEmpty()
	}, [location.pathname, user])

	const createNewComm = (comm: IComments) => {
		let temp = [...commentsItem]
		temp.push(comm)
		setCommentsItem(temp)
	}

	const handlerLike = async () => {
		if (user) {
			let temp = { ...user }
			temp.likeBoolean = !temp.likeBoolean
			temp.likeBoolean
				? (temp.likeCount = temp.likeCount + 1)
				: (temp.likeCount = temp.likeCount - 1)
			setUser(temp)
			dispatch(changeLikeStatus(id!))
			user?.likeBoolean
				? await Api().likes.delLike(id!)
				: await Api().likes.giveLike(id!)
		}
	}

	const NewCommMemo = memo(NewComm)
	return (
		<div className={style.postpage}>
			{status || user === undefined ? (
				<Spinner />
			) : (
				<>
					{' '}
					<div className={style.postpage__top}>
						<div
							className={style.postpage__top_arrow}
							style={{ cursor: 'pointer' }}
							onClick={() => navigate(-1)}
						>
							<HiOutlineArrowLeft />
						</div>
						<div className={style.postpage__top_info}>
							<div className={style.postpage__top_info_tweets}>Твит</div>
						</div>
					</div>
					<div className={style.postpage__user}>
						<div className={style.postpage__user_image}>
							<img
								src={`${process.env.REACT_APP_API_URL}${user?.user.avatarUrl}`}
								alt=''
							/>
						</div>
						<div className={style.postpage__user_text}>
							<div className={style.postpage__user_text_name}>
								<Link to={`/profile/${user?.user?._id}`}>
									{user?.user.fullName}
								</Link>
							</div>
							<div className={style.postpage__user_text_tag}>
								@{user?.user.userName}
							</div>
						</div>
					</div>
					<div className={style.postpage__text}>{user?.text}</div>
					<div className={style.postpage__tags}>
						{user?.tags.map((item, index) => (
							<div className={style.postpage__tags_tag} key={index + 1}>
								{item}
							</div>
						))}
					</div>
					<div className={style.postpage__info}>
						<div className={style.postpage__info_time}>
							{user && format(new Date(user?.createdAt!), 'H:mm')}
						</div>
						<div className={style.postpage__info_date}>
							{user && format(new Date(user?.createdAt), 'dd MMM yyy')}
						</div>
					</div>
					<div className={style.postpage__likes}>
						<div className={style.postpage__likes_count}>
							<span>{user?.likeCount}</span> отметки нравится
						</div>
					</div>
					<div className={style.postpage__icons}>
						<div
							className={style.postpage__icons_icon}
							onClick={handlerLike}
							style={{ color: user?.likeBoolean ? 'red' : 'gray' }}
						>
							<AiFillHeart />
						</div>
						<div className={style.postpage__icons_icon}>
							<BiRepost />
						</div>
						<div className={style.postpage__icons_icon}>
							<FiShare />
						</div>
						<div className={style.postpage__icons_icon}>
							<AiTwotoneMessage />
						</div>
					</div>
					<NewCommMemo id={user?._id} createNewComm={createNewComm} />
					{!isLoading ? (
						<div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
							{commentsItem.map((item, index) => (
								<CommentsMemo {...item} key={index + 1} />
							))}
						</div>
					) : (
						<Spinner />
					)}
					<div></div>
				</>
			)}
		</div>
	)
}
