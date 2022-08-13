import React, { memo, useState } from 'react'
import style from '../../styles/post/post.module.scss'
import { IPost } from '../../types/postsTypes'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { formatDate } from '../../utils/getDate'
import { AiFillHeart } from 'react-icons/ai'
import { BiRepost } from 'react-icons/bi'
import { AiTwotoneMessage } from 'react-icons/ai'
import { FiShare } from 'react-icons/fi'
import { Api } from '../../config'
import { BsPlusSquareFill } from 'react-icons/bs'
import { BsFillTrashFill } from 'react-icons/bs'
import { BsThreeDots } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { changeLikeStatus, unFollow } from '../../redux/slices/postsSlice'
import {
	changeLikeStatusUserPosts,
	deleteProfilePosts,
} from '../../redux/slices/authSlice'
import { deletePost } from '../../redux/slices/postsSlice'
import { FullImage } from '../fullImage/full-image'

export const Post: React.FC<IPost> = memo(
	({
		text,
		_id,
		user,
		imageUrl,
		tags,
		createdAt,
		likeCount,
		comments,
		likeBoolean,
	}) => {
		const [showPopup, setShowPopup] = useState<boolean>(false)
		const dispatch = useAppDispatch()
		const navigate = useNavigate()
		const { data } = useAppSelector(state => state.auth)
		const [showFullImage, setShowFullImage] = useState<boolean>(false)
		const [fullImage, setFullImage] = useState<string>()
		const handlerLike = async () => {
			try {
				dispatch(changeLikeStatus(_id))
				dispatch(changeLikeStatusUserPosts(_id))
				likeBoolean
					? await Api().likes.delLike(_id)
					: await Api().likes.giveLike(_id)
			} catch (err: any) {
				alert(err.response.data.message)
			}
		}

		const delPost = async () => {
			try {
				await Api().posts.deletePost(_id)
				dispatch(deletePost(_id))
				dispatch(deleteProfilePosts(_id))
				setShowPopup(false)
			} catch (err: any) {
				alert(err.response.data.message)
			}
		}
		const getFullImage = (image: string) => {
			setFullImage(image)
			setShowFullImage(true)
		}
		return (
			<div className={style.post}>
				<div className={style.post__block}>
					<div className={style.post__block_image}>
						<img src={`http://localhost:4444${user.avatarUrl}`} alt='' />
					</div>
					<div className={style.post__item}>
						<Link to={`/profile/${user._id}`}>
							<div className={style.post__block_userInfo}>
								<div className={style.post__block_userInfo_name}>
									{user.fullName}
								</div>
								<div className={style.post__block_userInfo_id}>
									@{user.userName}
								</div>
								<div className={style.post__block_userInfo_time}>
									{formatDate(createdAt)}
								</div>
							</div>
						</Link>
						<div
							className={style.post__block_text}
							onClick={() => navigate(`/post/${_id}`)}
						>
							{text}
						</div>
						<div
							className={style.post__block_tags}
							onClick={() => navigate(`/post/${_id}`)}
						>
							{tags.map((item, index) => (
								<span className={style.post__block_tags_tag} key={index + 1}>
									{item}
								</span>
							))}
						</div>
					</div>
				</div>
				{imageUrl ? (
					<div className={style.post__block_images_image}>
						<img
							src={`http://localhost:4444${imageUrl}`}
							alt=''
							onClick={() => getFullImage(imageUrl)}
						/>
					</div>
				) : null}
				<div className={style.post__icons}>
					<div className={style.post__icons_icon}>
						<AiTwotoneMessage /> {comments.length}
					</div>
					<div className={style.post__icons_icon}>
						<BiRepost />
					</div>
					<div className={style.post__icons_icon}>
						<AiFillHeart
							style={{ color: likeBoolean ? 'red' : 'gray' }}
							onClick={handlerLike}
						/>
						{likeCount}
					</div>
					<div className={style.post__icons_icon}>
						<FiShare />
					</div>
				</div>
				<div className={style.post__dots}>
					<BsThreeDots
						onClick={() => setShowPopup(!showPopup)}
						style={{ display: user._id === data?._id ? 'block' : 'none' }}
					/>
				</div>
				<div
					className={style.post__use_block}
					style={{ display: showPopup ? 'block' : 'none' }}
				>
					<ul className={style.post__use_block_list}>
						<li
							className={style.post__use_block_list_type_delete}
							onClick={delPost}
						>
							<span>
								<BsFillTrashFill />
							</span>{' '}
							Удалить
						</li>
					</ul>
				</div>
				{showFullImage && (
					<FullImage
						setShowFullImage={setShowFullImage}
						fullImage={fullImage!}
					/>
				)}
			</div>
		)
	}
)
