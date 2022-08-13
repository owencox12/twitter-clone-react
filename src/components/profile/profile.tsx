import React, { memo, useEffect, useState } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { AiTwotoneCalendar } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import style from '../../styles/profile/profile.module.scss'
import { Post } from '../sideBar/post'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IUser } from '../../types/authTypes'
import { Api } from '../../config'
import { setUserPosts } from '../../redux/slices/authSlice'
import { ProfileUpdate } from './profileUpdate'
import { setFollow, unFollow } from '../../redux/slices/postsSlice'
import { Spinner } from '../spinner/Spinner'
import { Comments } from '../postPage/comments'
import { FullImage } from '../fullImage/full-image'
export const Profile: React.FC = memo(() => {
	const { data, userPosts } = useAppSelector(state => state.auth)
	const { id } = useParams()
	const navigate = useNavigate()
	const [user, setUser] = useState<IUser>()
	const [showUpdatePopup, setShowUpdatePopup] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const location = useLocation()
	const [isLoading, setLoading] = useState<boolean>(true)
	const [isLoadingPosts, setLoadingPosts] = useState<boolean>(false)
	const [activeTab, setActiveTab] = useState<number>(0)
	const [fullImage, setFullImage] = useState<string>()
	const [showFullImage, setShowFullImage] = useState<boolean>(false)
	const tabsMenu = [
		{ tab: 'Твиты', filter: 'posts' },
		{ tab: 'Ответы', filter: 'comments' },
		// { tab: 'Медиа', filter: 'posts' },
		{ tab: 'Нравится', filter: 'likes' },
	]

	const loadPosts = async () => {
		try {
			setLoadingPosts(true)
			const postsUser = await Api().user.getUserPosts(id, 'posts')
			dispatch(setUserPosts(postsUser))
			setLoadingPosts(false)
			// data?._id === id && setLoadingPosts(false)
		} catch (err) {
			alert('Не удалось загрузить комментарии')
			setLoading(false)
		}
	}

	const loadUser = async () => {
		try {
			if (data !== null) {
				if (data._id !== id) {
					setLoading(true)
					const dataUser = await Api().user.getUser(id)
					setUser(dataUser)
					setLoading(false)
				} else {
					setUser(data)
					setLoading(false)
				}
			}
		} catch (err) {
			navigate('/')
		}
	}

	useEffect(() => {
		loadUser()
		loadPosts()
	}, [location.pathname])

	useEffect(() => {
		if (data !== null) {
			setUser(data!)
		}
	}, [data])

	const getFollow = async () => {
		if (user) {
			let temp = { ...user }
			temp.followStatus = !temp.followStatus
			setUser(temp)
			if (!temp.followStatus) {
				dispatch(unFollow(user?._id!))
			}
			try {
				if (!user.followStatus) {
					const data = await Api().subs.getNewFollowPosts(id)
					console.log(data)
					dispatch(setFollow(data))
				}
				user?.followStatus
					? await Api().subs.unFollow(id)
					: await Api().subs.follow(id)
			} catch (err) {
				console.warn(err)
				alert('Не удалось подписаться/отписаться')
			}
		}
	}

	const handlerFilter = async (index: number, filter: string) => {
		setActiveTab(index)
		if (filter !== undefined) {
			try {
				setLoadingPosts(true)
				const filtered = await Api().user.getUserPosts(id, filter)
				dispatch(setUserPosts(filtered))
				setLoadingPosts(false)
			} catch (err) {
				alert('Ошибка')
			}
		} else {
			setActiveTab(0)
		}
	}

	const PostMemo = memo(Post)

	const userPostsItem = userPosts.map((item: any, index) =>
		activeTab === 1 ? (
			<Comments {...item} key={index + 1} />
		) : (
			<PostMemo {...item} key={index + 5} />
		)
	)

	const getFullImage = (image: string) => {
		setFullImage(image)
		setShowFullImage(true)
	}

	return (
		<div className={style.profile}>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<div className={style.profile__top}>
						<div
							className={style.profile__top_arrow}
							onClick={() => navigate(-1)}
						>
							<HiOutlineArrowLeft />
						</div>
						<div className={style.profile__top_info}>
							<div className={style.profile__top_info_name}>
								{user?.fullName}
							</div>
							<div className={style.profile__top_info_tweets}>136 твитов</div>
						</div>
					</div>
					<div className={style.profile__image}>
						<img
							src={`${process.env.REACT_APP_API_URL}${user?.hatImage}`}
							alt=''
							onClick={() => getFullImage(user?.hatImage!)}
						/>
					</div>
					<div className={style.profile__user}>
						<div className={style.profile__user_image}>
							<img
								src={`${process.env.REACT_APP_API_URL}${user?.avatarUrl}`}
								alt=''
								onClick={() => getFullImage(user?.avatarUrl!)}
							/>
						</div>
						<div className={style.profile__user_sub}>
							{data?._id !== user?._id ? (
								<button
									className={
										user?.followStatus
											? `${style.profile__user_sub_btn} ${style.profile__user_sub_btn_followed}`
											: `${style.profile__user_sub_btn}`
									}
									onClick={getFollow}
								>
									{user?.followStatus ? 'Отписаться' : 'Читать'}
								</button>
							) : (
								<button
									className={style.profile__user_sub_update}
									onClick={() => setShowUpdatePopup(true)}
								>
									Изменить профиль
								</button>
							)}
						</div>
						<div className={style.profile__user_name}>{user?.fullName}</div>
						<div className={style.profile__user_tag}>@{user?.userName}</div>
						<div className={style.profile__user_about}>{user?.about}</div>
						<div className={style.profile__user_item}>
							<div className={style.profile__user_item_location}>
								<GoLocation style={{ marginRight: '5px' }} />
								{user?.location}
							</div>
							<div className={style.profile__user_reg}>
								<div>
									<span>
										<AiTwotoneCalendar />
									</span>{' '}
									регистрация январь 2016
								</div>
							</div>
						</div>
						<div className={style.profile__user_subs}>
							<div className={style.profile__user_subs_me}>
								<span>{user?.followCounter}</span> читаемых
							</div>
							<div className={style.profile__user_subs_onMe}>
								<span>{user?.subscribeCounter}</span> читателей
							</div>
						</div>
					</div>
					<div className={style.profile__menu}>
						<ul className={style.profile__menu_list}>
							{tabsMenu.map((item, index) => (
								<button
									className={style.profile__menu_list_type}
									onClick={() => handlerFilter(index, item.filter!)}
									style={{
										borderBottom:
											activeTab === index ? '2px solid steelblue' : 'none',
									}}
									key={index + 1}
									disabled={isLoadingPosts ? true : false}
								>
									{item.tab}
								</button>
							))}
						</ul>
					</div>
					<div className={style.profile__wrapper}>
						<div className={style.profile__wrapper_item}>
							{isLoadingPosts ? <Spinner /> : userPostsItem}
						</div>
					</div>
				</>
			)}
			{showUpdatePopup && (
				<ProfileUpdate
					patchObj={{
						fullName: user?.fullName!,
						avatarUrl: user?.avatarUrl,
						location: user?.location,
						webSite: user?.webSite,
						hatImage: user?.hatImage,
						about: user?.about,
					}}
					setShowUpdatePopup={setShowUpdatePopup}
				/>
			)}
			{showFullImage ? (
				<FullImage fullImage={fullImage!} setShowFullImage={setShowFullImage} />
			) : null}
		</div>
	)
})
