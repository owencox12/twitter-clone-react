import React, { memo, useEffect, useState } from 'react'
import { Api } from '../../config'
import style from '../../styles/rightBar/rightbar.module.scss'
import { IUser } from '../../types/authTypes'
import { useDebounce } from '../../utils/debounce'
import { RightBarSearch } from './rightBarSearch'
import { RightBarUser } from './rightbarUser'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Tags } from './tagsBlock'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { getUsers, setTags } from '../../redux/slices/rightBarSlice'
import { Spinner } from '../spinner/Spinner'

export const RightBar: React.FC = memo(() => {
	const [showSearchBlock, setShowSearchBlock] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>('')
	const [searchItem, setSearchItem] = useState<IUser[]>([])
	const [isLoading, setLoading] = useState<boolean>(false)
	const { tags, users } = useAppSelector(state => state.tags)
	const dispatch = useAppDispatch()
	const debounce = useDebounce(searchValue)

	const handlerChangeSarch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const loadTags = async () => {
		try {
			const tags = await Api().rightBar.getTags()
			dispatch(setTags(tags))
		} catch (err: any) {
			alert(err.response.data.message)
		}
	}

	const loadUser = async () => {
		try {
			const users = await Api().rightBar.getUsers()
			dispatch(getUsers(users))
		} catch (err: any) {
			alert(err.response.data.message)
		}
	}

	useEffect(() => {
		if (tags.length === 0 || users.length === 0) {
			loadTags()
			loadUser()
		}
	}, [])

	const loadSearch = async () => {
		try {
			setLoading(true)
			if (debounce && searchValue.length >= 3) {
				const data = await Api().different.search(searchValue)
				setSearchItem(data)
				setLoading(false)
			}
		} catch (err) {
			console.warn(err)
		}
	}

	useEffect(() => {
		loadSearch()

		if (searchValue.trim() !== '') {
			setShowSearchBlock(true)
		} else {
			setShowSearchBlock(false)
			setSearchItem([])
		}
	}, [debounce, searchValue])

	const searchResult = searchItem.map((item, index) => (
		<RightBarSearch
			{...item}
			key={index + 1}
			setShowSearchBlock={setShowSearchBlock}
		/>
	))

	const tagsItem = tags.map((item, index) => <Tags {...item} key={index + 1} />)
	const rightBarUsers = users.map((item, index) => (
		<RightBarUser {...item} key={index + 1} />
	))

	return (
		<div className={style.rightbar}>
			<div className={style.rightbar__search}>
				<div className={style.rightbar__search_input}>
					<input
						type='text'
						onChange={handlerChangeSarch}
						value={searchValue}
						className={style.rightbar__search_inp}
					/>
					<div
						className={style.rightbar__search_input_image}
						onClick={() => setSearchValue('')}
					>
						<AiOutlineCloseCircle />
					</div>
				</div>
				<div
					className={style.rightbar__search_block}
					style={{ display: showSearchBlock ? 'block' : 'none' }}
				>
					{isLoading ? (
						<Spinner />
					) : (
						<ul className={style.rightbar__search_block_list}>
							{searchResult}
						</ul>
					)}
				</div>
			</div>
			<div className={style.rightbar__block}>
				{tags.length !== 0 ? (
					<>
						<div className={style.rightbar__block_title}>Актуально сейчас</div>
						<div className={style.rightbar__block_wrapper}>{tagsItem}</div>
					</>
				) : (
					<Spinner />
				)}
			</div>
			<div
				className={style.rightbar__block}
				style={{ display: users.length === 0 ? 'none' : 'block' }}
			>
				{users.length !== 0 ? (
					<>
						<div className={style.rightbar__block_title}>Кого читать</div>
						<div className={style.rightbar__block_wrapper}>{rightBarUsers}</div>
					</>
				) : (
					<Spinner />
				)}
			</div>
		</div>
	)
})
