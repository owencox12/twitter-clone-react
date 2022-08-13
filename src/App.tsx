import { memo, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { NotAuth } from './components/auth/notAuth'
import { InfoBar } from './components/infoBar/infoBar'
import { Loader } from './components/loader/loader'
import { PostPage } from './components/postPage/postPage'
import { Profile } from './components/profile/profile'
import { RightBar } from './components/rightBar/rightBar'
import { SideBar } from './components/sideBar/sideBar'
import { Api } from './config'
import { useAppDispatch, useAppSelector } from './redux/hook'
import { isSelected, setStatus, setUser } from './redux/slices/authSlice'
import { getPosts, setPostsStatus } from './redux/slices/postsSlice'
import Cookies from 'js-cookie'

function App() {
	const isAuth = useAppSelector(isSelected)
	const dispatch = useAppDispatch()
	const { status } = useAppSelector(state => state.auth)
	const navigate = useNavigate()
	const location = useLocation()
	const SideBarMemo = memo(SideBar)
	const InfoBarMemo = memo(InfoBar)
	const PostPageMemo = memo(PostPage)

	const getToken = async () => {
		try {
			dispatch(setStatus(true))

			const data = await Api().user.getMe()
			dispatch(setUser(data))
			dispatch(setPostsStatus(true))
		} catch (err: any) {
			alert(err.response.data.message)
			Cookies.remove('token', {
				path: '/',
				// domain: 'owencoxtwitter-clone.herokuapp.com',
			})
			document.location.reload()
		}
	}

	const loadPosts = async () => {
		if (location.pathname !== '/') {
			try {
				const posts = await Api().posts.getPost()
				if (!posts.length) {
					dispatch(setPostsStatus(false))
				} else {
					dispatch(getPosts(posts))
				}
			} catch (err: any) {
				alert(err.response.data.message)
			}
		}
	}

	useEffect(() => {
		if (Cookies.get('token')) {
			getToken()
			loadPosts()
		}
	}, [])
	if (status) {
		return <Loader />
	}
	return (
		<>
			<div
				className='container'
				style={{ maxWidth: isAuth ? '1100px' : '2000px' }}
			>
				<div className='wrapper'>
					{isAuth ? (
						<>
							<SideBarMemo />
							<Routes>
								<Route path='/' element={<InfoBarMemo />} />
								<Route path='/profile/:id' element={<Profile />} />
								<Route path='/post/:id' element={<PostPageMemo />} />
							</Routes>
							<RightBar />
						</>
					) : (
						<NotAuth />
					)}
				</div>
			</div>
		</>
	)
}

export default App
