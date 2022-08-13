import React, { useRef, useState } from 'react'
import style from '../../styles/full-image/fullImage.module.scss'
import { VscChromeClose } from 'react-icons/vsc'
import { useOnClickOutside } from '../../utils/useOnClickOutside'

interface fullImageProps {
	fullImage: string
	setShowFullImage: (show: boolean) => void
}

export const FullImage: React.FC<fullImageProps> = ({
	fullImage,
	setShowFullImage,
}) => {
	const [imageUrl, setImageUrl] = useState<string>(fullImage)
	const ref: any = useRef()
	useOnClickOutside(ref, () => setShowFullImage(false))

	return (
		<div className={style.full}>
			<div className={style.full__image}>
				<img
					src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
					alt=''
					ref={ref}
				/>
				<div
					className={style.full__close}
					onClick={() => setShowFullImage(false)}
				>
					<VscChromeClose />
				</div>
			</div>
		</div>
	)
}
