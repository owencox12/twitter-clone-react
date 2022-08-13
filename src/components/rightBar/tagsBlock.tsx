import React, { memo } from 'react'
import style from '../../styles/rightBar/tags.module.scss'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { Link } from 'react-router-dom'
interface tagsProps {
	tags: string[]
	_id: string
}

export const Tags: React.FC<tagsProps> = memo(({ tags, _id }) => {
	return (
		<div className={style.tags__block_item}>
			<div className={style.tags__item}>
				<div className={style.tags__block_item_info}>
					<div className={style.tags__block_item_info_theme}>Политика</div>
				</div>
				{tags.map((item, index) => (
					<div className={style.tags__block_item_tag} key={index + 1}>
						<Link to={`/post/${_id}`}>{item}</Link>
					</div>
				))}
			</div>
			<div className={style.tags__item_icon} style={{ color: '#fff' }}>
				<BiDotsHorizontalRounded />
			</div>
		</div>
	)
})
