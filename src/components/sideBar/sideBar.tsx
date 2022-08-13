import React, { memo, useMemo, useState } from 'react'
import { BsTwitter } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { FiHash, FiBell, FiUser } from 'react-icons/fi'
import { FaRegEnvelope } from 'react-icons/fa'
import { BsBookmarkStar } from 'react-icons/bs'
import { RiListSettingsFill } from 'react-icons/ri'
import { CgMoreO } from 'react-icons/cg'
import style from '../../styles/sideBar/sidebar.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { logOut } from '../../redux/slices/authSlice'
import { clearPosts } from '../../redux/slices/postsSlice'
import Cookies from 'js-cookie'
import { clearRightBar } from '../../redux/slices/rightBarSlice'
import styled from 'styled-components'

export const SideBar: React.FC = () => {
	const { data } = useAppSelector(state => state.auth)
	const linkAndIcon = [
		{ link: 'Главная', path: '/', icons: <AiOutlineHome /> },
		{ link: 'Обзор', path: '', icons: <FiHash /> },
		{ link: 'Уведомления', path: '', icons: <FiBell /> },
		{ link: 'Сообщения', path: '', icons: <FaRegEnvelope /> },
		{ link: 'Закладки', path: '', icons: <BsBookmarkStar /> },
		{ link: 'Списки', path: '', icons: <RiListSettingsFill /> },
		{ link: 'Профиль', path: `/profile/${data?._id}`, icons: <FiUser /> },
		{ link: 'Ещё', path: '', icons: <CgMoreO /> },
	]
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [showPopup, setShowPopup] = useState<boolean>(false)
	const logOuts = () => {
		dispatch(logOut())
		Cookies.remove('token', { path: '/', domain: 'localhost' })
		navigate('/')
		dispatch(clearPosts())
		dispatch(clearRightBar())
		setShowPopup(false)
	}
	return (
		<div className={style.sidebar}>
			<div className={style.sidebar__wrapper}>
				<div className={style.sidebar__logo}>
					<BsTwitter />
				</div>
				<ul className={style.sidebar__list}>
					{linkAndIcon.map((item, index) => (
						<li className={style.sidebar__list_type} key={index + 1}>
							<Link to={item.path}>
								<span>{item.icons}</span> {item.link}
							</Link>
						</li>
					))}
				</ul>
				<div className={style.sidebar__btn}>
					<button>Твитнуть</button>
				</div>
				<div className={style.sidebar__profile}>
					<div className={style.sidebar__profile_info}>
						<div className={style.sidebar__profile_info_image}>
							<img src={`http://localhost:4444${data?.avatarUrl}`} alt='' />
						</div>
						<div className={style.sidebar__profile_info_text}>
							<div className={style.sidebar__profile_info_text_name}>
								{data?.fullName}
							</div>
							<div className={style.sidebar__profile_info_text_id}>
								@{data?.userName}
							</div>
						</div>
					</div>
					<div className={style.sidebar__profile_dots}>
						<BiDotsHorizontalRounded onClick={() => setShowPopup(!showPopup)} />
					</div>
				</div>
				<div
					className={style.sidebar__profile_blockTop}
					style={{ display: showPopup ? 'block' : 'none' }}
				>
					<div className={style.sidebar__profile_block_top}>
						<div className={style.sidebar__profile_block_top_image}>
							<img src={`http://localhost:4444${data?.avatarUrl}`} alt='' />
						</div>
						<div className={style.sidebar__profile_block_top_text}>
							<div className={style.sidebar__profile_block_top_text_name}>
								{data?.fullName}
							</div>
							<div className={style.sidebar__profile_block_top_text_tag}>
								@{data?.userName}
							</div>
						</div>
					</div>
					<ul className={style.sidebar__profile_block_list}>
						<li
							className={style.sidebar__profile_block_list_type}
							onClick={logOuts}
						>
							Выйти из учётной записи @owencox12
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
