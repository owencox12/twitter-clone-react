import React, { useState } from 'react'
import { BsTwitter } from 'react-icons/bs'
import style from '../../styles/auth/notAuth.module.scss'
import styled from 'styled-components'
import { Register } from './register'
import { Login } from './login'

export const PopupBlock = styled.div`
	width: 500px;
	min-height: 300px;
	display: block;
	margin: 0 auto;
	background: #000;
	border-radius: 10px;
	position: relative;
	padding-bottom: 30px;
	z-index: 1000;
`

export const Popup = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background: rgba(143, 184, 218, 0.3);
	padding-top: 100px;
`

export const NotAuth: React.FC = () => {
	const [showRegister, setShowRegister] = useState<boolean>(false)
	const [showLogin, setShowLogin] = useState<boolean>(false)

	return (
		<div className={style.not}>
			<div className={style.not__wrapper}>
				<div className={style.not__item}>
					<div className={style.not__item_image}>
						<img src='./twitterAuth.jpg' alt='' />
					</div>
				</div>
				<div className={style.not__item}>
					<div className={style.not__item_logo}>
						<BsTwitter />
					</div>
					<div className={style.not__item_title}>В курсе происходящего</div>
					<div className={style.not__item_join}>
						Присоединяйтесь к Твиттеру прямо сейчас!
					</div>
					<div className={style.not__item_btns}>
						<div className={style.not__item_btns_btn_register}>
							<button onClick={() => setShowRegister(true)}>Регистрация</button>
						</div>
						<div className={style.not__item_btns_btn_auth}>
							<button onClick={() => setShowLogin(true)}>Войти</button>
						</div>
					</div>
				</div>
			</div>
			<div className={style.not__footer}>
				<div className={style.not__footer_text}>
					TWITTER CLONE 2022. DEVELOPE BY OWENCOX.
				</div>
			</div>
			<div className={style.popup__register}>
				{showRegister ? <Register setShowRegister={setShowRegister} /> : null}
				{showLogin ? <Login setShowLogin={setShowLogin} /> : null}
			</div>
		</div>
	)
}
