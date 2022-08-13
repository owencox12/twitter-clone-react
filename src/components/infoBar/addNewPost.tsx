import React, { ChangeEvent, memo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { TiImage } from 'react-icons/ti'
import { Api } from '../../config'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { createPosts } from '../../redux/slices/postsSlice'
import style from '../../styles/addNewPost/addNewPost.module.scss'
import { ICreatePost } from '../../types/postsTypes'
import { loadFile } from '../../utils/formData'

interface formValue {
	text: string
}

export const AddNewPost: React.FC = memo(() => {
	const [imageUrl, setImageUrl] = useState<string>('')
	const { data } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<formValue>({
		mode: 'onChange',
	})

	const handlerChangeFile = async (e: any) => {
		try {
			const upload: any = await Api().different.upload(
				loadFile(e.target.files[0])
			)
			setImageUrl(upload)
		} catch (err: any) {
			alert(err.response.data.message)
		}
	}

	const onSubmit = async (data: formValue) => {
		const { text } = data
		const resTags = text.split(' ')
		let tags = ''
		let resText = ''
		for (let i = 0; i < resTags.length; i++) {
			if (resTags[i].includes('@')) {
				tags += ' ' + resTags[i]
			} else {
				resText += ' ' + resTags[i]
			}
		}

		const newPost: ICreatePost = {
			text: resText,
			imageUrl: imageUrl,
		}
		const t = {
			tags: tags,
		}
		const b = tags.split(' ')
		const response = await Api().posts.createPost(newPost)
		reset()
		setImageUrl('')
		for (let i = 0; i < b.length; i++) {
			if (b[i] !== '') {
				response.tags.push(b[i])
			}
		}
		if (response) {
			dispatch(createPosts(response))
		}
		const tagRes = await Api().posts.setTags(t, response._id)
	}

	return (
		<form className={style.infobar__form} onSubmit={handleSubmit(onSubmit)}>
			<div className={style.infobar__form_info}>
				<div className={style.infobar__form_info_image}>
					<img src={`http://localhost:4444${data?.avatarUrl}`} alt='' />
				</div>
				<textarea
					className={style.infobar__form_textarea}
					{...register('text', {
						required: 'Это поле обязательно к заполнению!',
						minLength: {
							value: 5,
							message: 'Минимум 5 символов!',
						},
					})}
					placeholder='Что происходит?'
				/>
			</div>
			<div>
				{errors?.text && (
					<p style={{ color: 'red' }}>{errors?.text?.message}</p>
				)}
			</div>
			{imageUrl ? (
				<img
					src={`http://localhost:4444${imageUrl}`}
					className={style.infobar__form_image}
					alt='image'
				/>
			) : null}
			<div className={style.infobar__form_use}>
				<input
					type='file'
					onChange={handlerChangeFile}
					id='file'
					style={{ display: 'none' }}
				/>
				<label className={style.infobar__form_use_icons} htmlFor='file'>
					<TiImage />
				</label>
				<div className={style.infobar__form_use_btn}>
					<button>Твитнуть</button>
				</div>
			</div>
		</form>
	)
})
