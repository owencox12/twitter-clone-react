import React from 'react'
import { GrTwitter } from 'react-icons/gr'
import style from '../../styles/loader/loader.module.scss'

export const Loader: React.FC = () => {
    return (
        <div className={style.loader}>
            <div className={style.loader__image}>
                <GrTwitter />
            </div>
        </div>
    )
}