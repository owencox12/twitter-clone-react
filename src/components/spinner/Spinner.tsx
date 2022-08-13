import React, { memo } from 'react'
import style from '../../styles/Spinner/spinner.module.scss'
export const Spinner: React.FC = memo(() => {
	return <div className={style.lds}></div>
})
