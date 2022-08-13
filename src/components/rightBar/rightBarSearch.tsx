import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../styles/rightBar/rightBarSearch.module.scss'
import { IUser } from '../../types/authTypes'
interface righBarProps {
	setShowSearchBlock: (showSearchBlock: boolean) => void
}

export const RightBarSearch: React.FC<IUser & righBarProps> = ({
	fullName,
	userName,
	avatarUrl,
	_id,
	setShowSearchBlock,
}) => {
	return (
		<li className={style.rightbar__search_block_list_type}>
			<div className={style.rightbar__search_block_list_type_image}>
				<img
					src={`${process.env.REACT_APP_API_URL}${avatarUrl}`}
					width={60}
					height={60}
					alt=''
				/>
			</div>
			<div className={style.rightbar__search_block_list_type_info}>
				<div className={style.rightbar__search_block_list_type_info_name}>
					<Link
						to={`/profile/${_id}`}
						onClick={() => setShowSearchBlock(false)}
					>
						{fullName}
					</Link>
				</div>
				<div className={style.rightbar__search_block_list_type_info_tag}>
					@{userName}
				</div>
			</div>
		</li>
	)
}
