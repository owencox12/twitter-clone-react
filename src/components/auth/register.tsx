import React, { useEffect, useState } from 'react'
import { Popup, PopupBlock } from './notAuth'
import { BsTwitter } from 'react-icons/bs'
import { VscChromeClose } from 'react-icons/vsc'
import {
	yearRes,
	dateRes,
	monthRes,
	monthRus,
	getYears,
} from '../../utils/dateInfo'
import style from '../../styles/auth/register.module.scss'
import { useForm } from 'react-hook-form'
import { Api } from '../../config'
import { useAppDispatch } from '../../redux/hook'
import { setStatus, setUser } from '../../redux/slices/authSlice'
import { authResponse } from '../../types/authTypes'
import Cookies from 'js-cookie'

interface registerProp {
	setShowRegister: any
}

interface formValues {
	userName: string
	email: string
	fullName: string
	password: string
}

export const Register: React.FC<registerProp> = ({ setShowRegister }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<formValues>({
		mode: 'onChange',
	})
	const dispatch = useAppDispatch()
	const [year, setYear] = useState<string>('2022')
	const [date, setDate] = useState<string>('1')
	const [month, setMonth] = useState<string | number>()

	useEffect(() => {
		for (let i = 0; i < monthRus.length; i++) {
			if (monthRus[i] === month) {
				setMonth(i + 1)
			}
		}
	}, [month])

	const onSubmit = async (data: formValues) => {
		const resDate = `${month}.${date}.${year}`
		const dateOfBirth = new Date(resDate).getTime().toString()
		const years = getYears(new Date(resDate).getTime())
		const { fullName, userName, password, email } = data
		const res: authResponse = {
			fullName: fullName,
			userName: userName,
			password: password,
			email: email,
			dateOfBirth: dateOfBirth,
			years: years,
		}
		try {
			dispatch(setStatus(true))
			const response = await Api().user.register(res)
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
					<form
						className={style.register__form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={style.register__form_logo}>
							<BsTwitter />
						</div>
						<div className={style.register__form_title}>
							Создайте учетную запись
						</div>
						<input
							type='text'
							className={style.register__form_inp}
							{...register('userName', {
								required: 'Это поле обязательно к заполнению!',
								minLength: {
									value: 5,
									message: 'Минимум 5 символов!',
								},
							})}
							placeholder='Имя пользователя'
						/>
						<div>
							{errors?.userName && (
								<p style={{ color: 'red' }}>{errors?.userName?.message}</p>
							)}
						</div>
						<input
							type='email'
							className={style.register__form_inp}
							placeholder='Адрес электронной почты'
							{...register('email', {
								required: 'Это поле обязательно к заполнению!',
							})}
						/>
						<div>
							{errors?.email && (
								<p style={{ color: 'red' }}>{errors?.email?.message}</p>
							)}
						</div>
						<input
							type='password'
							className={style.register__form_inp}
							placeholder='Пароль'
							{...register('password', {
								required: 'Это поле обязательно к заполнению!',
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
						<input
							type='text'
							className={style.register__form_inp}
							placeholder='Имя'
							{...register('fullName', {
								required: 'Это поле обязателно к заполнению!',
								minLength: {
									value: 2,
									message: 'Имя должно быть минимум 2 символа',
								},
							})}
						/>
						<div>
							{errors?.fullName && (
								<p style={{ color: 'red' }}>{errors?.fullName?.message}</p>
							)}
						</div>
						<div className={style.register__form_date_title}>
							Дата рождения
							<br />
							<span>
								Эта информация не будет общедоступной. Подтвердите свой возраст,
								даже если эта учетная запись предназначена для компании,
								домашнего животного и т. д.
							</span>
						</div>
						<div className={style.register__form_selected}>
							<select
								className={style.register__form_selected_date}
								onChange={e => setDate(e.target.value)}
							>
								{dateRes.map((item, index) => (
									<option key={index + 1}>{item}</option>
								))}
							</select>
							<select
								className={style.register__form_selected_month}
								onChange={e => setMonth(e.target.value)}
							>
								{monthRes.map((item, index) => (
									<option key={index + 1}>{monthRus[index]}</option>
								))}
							</select>
							<select
								className={style.register__form_selected_date}
								onChange={e => setYear(e.target.value)}
							>
								{yearRes.map((item, index) => (
									<option key={index + 1}>{item}</option>
								))}
							</select>
						</div>
						<div className={style.register__form_submit}>
							<button type='submit'>Зарегистрироваться</button>
						</div>
					</form>
					<div
						className={style.register__close}
						onClick={() => setShowRegister(false)}
					>
						<VscChromeClose />
					</div>
				</PopupBlock>
			</Popup>
		</>
	)
}
