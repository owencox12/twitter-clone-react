import React, { memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TiImage } from 'react-icons/ti'
import { Api } from '../../config'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { addComments } from '../../redux/slices/postsSlice'
import style from '../../styles/postpage/addNewComm.module.scss'
import { IComments, ICreateComment } from '../../types/postsTypes'
import { loadFile } from '../../utils/formData'

interface formValues {
	comment: string
}

interface NewCommProps {
	id: string | undefined
	createNewComm: (comm: IComments) => void
}

export const NewComm: React.FC<NewCommProps> = ({ id, createNewComm }) => {
	const { data } = useAppSelector(state => state.auth)
	const [imageUrl, setImageUrl] = useState<string>()
	const [showSpinner, setShowSpinner] = useState<boolean>()
	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
		reset,
	} = useForm<formValues>({ mode: 'onSubmit' })

	const handlerChangeFile = async (e: any) => {
		try {
			const url = await Api().different.upload(loadFile(e.target.files[0]))
			setImageUrl(url)
		} catch (err: any) {
			alert(err.response.data.message)
		}
	}

	const onSubmit = async (data: formValues) => {
		setShowSpinner(true)
		const { comment } = data
		const newComment: ICreateComment = {
			text: comment,
			imageUrl: imageUrl!,
		}
		const newComm = await Api().comments.createComm(newComment, id!)
		if (newComm) {
			createNewComm(newComm[0])
			dispatch(
				addComments({
					_id: id!,
					comments: newComm[0],
				})
			)
		}
		reset()
		setImageUrl('')
		setShowSpinner(false)
	}

	return (
		<div className={style.new}>
			<form className={style.new__form} onSubmit={handleSubmit(onSubmit)}>
				<div className={style.new__form_image}>
					<img
						src={`${process.env.REACT_APP_API_URL}${data?.avatarUrl}`}
						alt=''
					/>
				</div>
				<textarea
					className={style.new__form_textarea}
					placeholder='Твитнуть в ответ'
					{...register('comment', {
						required: 'Это поле обязательно к заполнению!',
						minLength: {
							value: 2,
							message: 'Минимум 2 символа!',
						},
					})}
				/>
				<button className={style.new__form_btn}>Ответ</button>
			</form>
			{
				<div>
					{errors?.comment && (
						<p style={{ color: 'red' }}>{errors?.comment.message}</p>
					)}
				</div>
			}
			{imageUrl && (
				<img
					src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
					width={150}
					height={100}
					alt=''
				/>
			)}
			<div className={style.new__file}>
				<input
					type='file'
					onChange={handlerChangeFile}
					className={style.new__form_inputFile}
					id='file6'
				/>
				<label className={style.new__form_file} htmlFor='file6'>
					<TiImage />
				</label>
				{showSpinner && (
					<div style={{ color: '#fff', fontSize: '20px' }}>Отправка....</div>
				)}
			</div>
		</div>
	)
}
