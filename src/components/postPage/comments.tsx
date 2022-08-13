import React, { memo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import style from '../../styles/postpage/comments.module.scss'
import { IComments } from '../../types/postsTypes'
import { formatDate } from '../../utils/getDate'

export const Comments: React.FC<IComments> = memo(
	({ user, text, _id, imageUrl, createdAt, post }) => {
		const location = useLocation()
		const navigate = useNavigate()
		const goToPost = () => {
			if (location.pathname === `/profile/${user._id}`) {
				navigate(`/post/${post}`)
			}
		}

		return (
			<div className={style.comments}>
				<div className={style.comments__block} onClick={goToPost}>
					<div className={style.comments__block}>
						<div className={style.comments__block_user}>
							<div className={style.comments__block_user_image}>
								<img src={`http://localhost:4444${user.avatarUrl}`} alt='' />
							</div>
							<div className={style.comments__block_user_info}>
								<div className={style.comments__block_user_info_name}>
									<Link to={`/profile/${user._id}`}>{user.fullName}</Link>
								</div>
								<div className={style.comments__block_user_info_tag}>
									@{user.userName}
								</div>
								<div className={style.comments__block_user_info_time}>
									{createdAt && formatDate(createdAt)}
								</div>
							</div>
						</div>
						<div className={style.comments__block_text}>
							{/* <div className={style.comments__block_text_to}>
                            В ответ @owencox12
                        </div> */}
							<div className={style.comments__block_text_comm}>{text}</div>
							<div className={style.comments__block_text_image}>
								{imageUrl && (
									<img src={`http://localhost:4444${imageUrl}`} alt='' />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
)
