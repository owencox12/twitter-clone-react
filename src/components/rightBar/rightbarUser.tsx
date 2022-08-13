import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Api } from '../../config'
import { useAppDispatch } from '../../redux/hook'
import { setFollow, unFollow } from '../../redux/slices/postsSlice'
import { handlerFollowStatus } from '../../redux/slices/rightBarSlice'
import style from '../../styles/rightBar/rightbaruser.module.scss'
import { IUser } from '../../types/authTypes'

export const RightBarUser: React.FC<IUser> = ({
	userName,
	fullName,
	avatarUrl,
	_id,
	followStatus,
}) => {
	const dispatch = useAppDispatch()

	const handlerFollow = async () => {
		try {
			dispatch(handlerFollowStatus(_id))
			if (!followStatus) {
				const data = await Api().subs.getNewFollowPosts(_id)
				dispatch(setFollow(data))
			} else if (followStatus) {
				dispatch(unFollow(_id))
			}
			!followStatus
				? await Api().subs.follow(_id)
				: await Api().subs.unFollow(_id)
		} catch (err) {
			alert('Ошибка при подписке/отписке')
		}
	}

	return (
		<div className={style.user__item}>
			<div className={style.user__item_info}>
				<div
					className={style.user__item_info_image}
					onClick={() => console.log(followStatus)}
				>
					<img src={`${process.env.REACT_APP_API_URL}${avatarUrl}`} alt='' />
				</div>
				<div className={style.user__item_info_text}>
					<Link to={`/profile/${_id}`}>
						<div className={style.user__item_info_text_name}>{fullName}</div>
					</Link>
					<div className={style.user__item_info_text_tag}>@{userName}</div>
				</div>
			</div>
			<div
				className={style.user__item_btn}
				onClick={() => console.log(followStatus)}
			>
				<button
					onClick={handlerFollow}
					className={
						followStatus
							? `${style.user__item_btn_button} ${style.user__item_btn_button_active}`
							: `${style.user__item_btn_button}`
					}
					// style={{ background: followStatus ? 'gray' : '#fff' }}
				>
					Читать
				</button>
			</div>
		</div>
	)
}
