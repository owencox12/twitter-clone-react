import React from 'react'
import { Popup, PopupBlock } from './notAuth'
import { BsTwitter } from 'react-icons/bs'
import { VscChromeClose } from 'react-icons/vsc'
import style from '../../styles/auth/login.module.scss'
import { useForm } from 'react-hook-form'
import { Ilogin } from '../../types/authTypes'
import { Api } from '../../config'
import { useAppDispatch } from '../../redux/hook'
import { setStatus, setUser } from '../../redux/slices/authSlice'
import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie'

interface loginProps {
	setShowLogin: any
}

interface validationTypes {
	userName: string
	password: string
}

export const Login: React.FC<loginProps> = ({ setShowLogin }) => {
	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
		reset,
	} = useForm<validationTypes>({ mode: 'onChange' })
	const dispatch = useAppDispatch()
	const [cookie, setCookie, removeCookie] = useCookies()

	const onSubmit = async (data: Ilogin) => {
		try {
			dispatch(setStatus(true))
			const response = await Api().user.login(data)
			dispatch(setUser(response))
			Cookies.set('token', response.token, { expires: 30, path: '/' })
		} catch (err: any) {
			dispatch(setStatus(false))
			console.warn(err)
			alert(err.response.data.message)
		}
	}
	return (
		<>
			<Popup>
				<PopupBlock>
					<form className={style.login__form} onSubmit={handleSubmit(onSubmit)}>
						<div className={style.login__form_logo}>
							<BsTwitter />
						</div>
						<div className={style.login__form_title}>Авторизуйтесь</div>
						<input
							type='text'
							className={style.login__form_inp}
							placeholder='Имя пользователя'
							{...register('userName', {
								required: 'Это обязательное поле!',
								minLength: {
									value: 5,
									message: 'Имя пользователя должно быть минимум 5 символов!',
								},
							})}
						/>
						<div>
							{errors?.userName && (
								<p style={{ color: 'red' }}>{errors?.userName?.message}</p>
							)}
						</div>
						<input
							type='password'
							className={style.login__form_inp}
							placeholder='Пароль'
							{...register('password', {
								required: 'Это обязательное поле!',
								minLength: {
									value: 6,
									message: 'Пароль должен быть минимум 6 символов!',
								},
							})}
						/>
						<div>
							{errors?.password && (
								<p style={{ color: 'red' }}>{errors?.password?.message}</p>
							)}
						</div>
						<div className={style.login__form_submit}>
							<button type='submit'>Войти</button>
						</div>
					</form>
					<div
						className={style.login__close}
						onClick={() => setShowLogin(false)}
					>
						<VscChromeClose />
					</div>
				</PopupBlock>
			</Popup>
		</>
	)
}
