import React, { memo, useState } from 'react'
import { Popup, PopupBlock } from '../auth/notAuth'
import { FiCamera } from 'react-icons/fi'
import { VscChromeClose } from 'react-icons/vsc'
import style from '../../styles/profile/profileUpdate.module.scss'
import { useForm } from 'react-hook-form'
import { loadFile } from '../../utils/formData'
import { Api } from '../../config'
import { patchObjType } from '../../types/profileTypes'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hook'
import { updateProfile } from '../../redux/slices/authSlice'

interface profileUpdateProps {
	setShowUpdatePopup: any
	patchObj: patchObjType
}
interface formValues {
	location: string
	about: string
	fullName: string
	webSite: string
}

export const ProfileUpdate: React.FC<profileUpdateProps> = memo(
	({ patchObj, setShowUpdatePopup }) => {
		const {
			register,
			handleSubmit,
			formState: { isValid, errors },
			reset,
		} = useForm<formValues>({
			mode: 'onChange',
			defaultValues: {
				fullName: patchObj.fullName,
				about: patchObj.about,
				webSite: patchObj.webSite,
				location: patchObj.location,
			},
		})
		const [patchHatImage, setPatchHatImage] = useState<string | undefined>(
			patchObj.hatImage
		)
		const [patchAvatarUrl, setpatchAvatarUrl] = useState<string | undefined>(
			patchObj.avatarUrl
		)
		const { id } = useParams()
		const dispatch = useAppDispatch()

		const onSubmit = async (data: formValues) => {
			const { fullName, webSite, about, location } = data
			const updateRes: patchObjType = {
				fullName: fullName,
				webSite: webSite,
				location: location,
				about: about,
				avatarUrl: patchAvatarUrl,
				hatImage: patchHatImage,
			}
			Api().profile.updateProfile(id, updateRes)
			dispatch(updateProfile(updateRes))
			reset()
			setShowUpdatePopup(false)
		}

		const handlerChangeFile = async (e: any, setState: Function) => {
			try {
				const url = await Api().different.upload(loadFile(e.target.files[0]))
				setState(url)
			} catch (err: any) {
				alert(err.response.data.message)
			}
		}

		return (
			<Popup>
				<PopupBlock
					style={{ width: '700px', padding: '25px 20px', minHeight: '500px' }}
				>
					<div className={style.update__top}>
						<div className={style.update__top_image}>
							{patchHatImage && (
								<img
									className={style.update__top_image_file_image}
									src={`${process.env.REACT_APP_API_URL}${patchHatImage}`}
								/>
							)}
							<div className={style.update__top_image_file}>
								<input
									type='file'
									onChange={e => handlerChangeFile(e, setPatchHatImage)}
									className={style.update__top_image_file_inp}
									id='file2'
								/>
								<label htmlFor='file2'>
									<FiCamera />
								</label>
							</div>
						</div>
					</div>
					<div className={style.update__main}>
						<div className={style.update__main_image}>
							<img
								src={`${process.env.REACT_APP_API_URL}${
									patchAvatarUrl ? patchAvatarUrl : patchObj.avatarUrl
								}`}
								alt=''
							/>
							<div className={style.update__main_image_file}>
								<input
									type='file'
									id='file3'
									onChange={e => handlerChangeFile(e, setpatchAvatarUrl)}
									className={style.update__main_image_file_inp}
								/>
								<label htmlFor='file3'>
									<FiCamera />
								</label>
							</div>
						</div>
					</div>
					<form
						className={style.update__form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							type='text'
							className={style.update__form_inp}
							{...register('fullName', {
								required: 'Это обязательное поле!',
								minLength: {
									value: 2,
									message: 'В этом поле должно быть минимум 2 символа!',
								},
							})}
							placeholder='Имя'
						/>
						<textarea placeholder='О себе' {...register('about')} />
						<input
							type='text'
							className={style.update__form_inp}
							{...register('location')}
							placeholder='Местоположение'
						/>
						<input
							type='text'
							className={style.update__form_inp}
							placeholder='Вебсайт'
							{...register('webSite')}
						/>
						<div className={style.update__form_use}>
							<div className={style.update__form_items}>
								<div className={style.update__form_items_item}>
									<div className={style.update__form_items_item_image}>
										<VscChromeClose onClick={() => setShowUpdatePopup(false)} />
									</div>
									<div
										className={style.update__form_items_item_text}
										onClick={() => console.log(patchHatImage)}
									>
										Изменить профиль
									</div>
								</div>
								<div className={style.update__form_items_item}>
									<button>Сохранить</button>
								</div>
							</div>
						</div>
					</form>
				</PopupBlock>
			</Popup>
		)
	}
)
