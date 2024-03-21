'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userDataState, userDataStateSelector } from '@/atoms/states';
import { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const SignIn = () => {
	const router = useRouter()
	const setUserData = useSetRecoilState(userDataStateSelector)
	const userData = useRecoilValue(userDataState)
	const SignInSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6).max(12)
	})
	const [isRender, setIsRender] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [customErrors, setCustomError] = useState("")
	const [checked, setChecked] = useState(false)

	type SignInSchemaType = z.infer<typeof SignInSchema>

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<SignInSchemaType>({ resolver: zodResolver(SignInSchema) })

	useEffect(() => {
		if (userData.logged_in === true) {
			router.push('/')
		}
		setIsRender(true)
	}, [])

	const googleSignInHandler = useGoogleLogin({
		onSuccess: async (res) => {
			await axios.post(`${process.env.BACKEND_URL}/api/registrations/google_auth`, {
			}, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${res.access_token}`
				}
			}).then(async (res) => {
				setUserData({ ...res.data })
				await router.push('/')
			}).catch((err) => {
				setCustomError(err?.response?.data?.error || "")
			})
		},
		onError: (err) => {
			console.log(err)
		},
		scope: 'email profile',
	})

	return isRender && (
		<form className="2xl:w-2/12 xl:w-3/12 lg:w-4/12 md:w-5/12 sm:w-6/12 xs:w-8/12 w-9/12 p-7 flex flex-col justify-center border-primary/30 border-[0.1px] rounded-xl gap-y-4 text-lg shadow-lg shadow-black bg-background" autoComplete="off" onSubmit={handleSubmit(async (data) => {
			setIsLoading(true)
			await axios.post(`${process.env.BACKEND_URL}/api/sessions`, {
				user: {
					email: data.email,
					password: data.password,
					remember: checked
				}
			},
				{
					withCredentials: true
				}
			).then((res) => {
				setUserData({ ...res.data } as userData)
				setIsLoading(false)
				router.push('/')
			}).catch((err) => {
				if (err?.response?.status === 401) {
					setError("password", {
						type: 'manual',
						message: err.response.data.error
					})
				} else if (err?.response?.status === 404) {
					setError("email", {
						type: 'manual',
						message: err.response.data.error
					})
				}
			})
			setIsLoading(false)
		})}>
			<div className="text-center text-xl uppercase tracking-wide font-semibold">
				Sign In
			</div>
			<fieldset className={`flex flex-col rounded-lg focus-within:border-[0.1px] ${errors.email ? "focus-within:border-red-800 border-red-800/60" : "focus-within:border-white border-white/60"}  border-[0.1px] focus-within:text-white text-white/60`}>
				{
					errors.email ?
						<legend className="text-sm">
							{errors.email.message}
						</legend>
						:
						<legend className="text-sm">
							Email
						</legend>
				}
				<input type='text' className="bg-background text-white focus:outline-none text-base" {...register('email')} />
			</fieldset>
			<fieldset className={`flex flex-col rounded-lg focus-within:border-[0.1px] ${errors.password ? "focus-within:border-red-800 border-red-800/60" : "focus-within:border-white border-white/60"}  border-[0.1px] focus-within:text-white text-white/60`}>
				{
					errors.password ?
						<legend className="text-sm">
							{errors.password.message}
						</legend>
						:
						<legend className="text-sm">
							Password
						</legend>
				}
				<input type='password' className="bg-background text-white focus:outline-none text-base" {...register('password')} />
			</fieldset>
			<div className='text-base flex items-center gap-x-2 text-white/80'>
				<input type='checkbox' className='cursor-pointer' onChange={(e) => {
					setChecked(e.target.checked)
				}} />
				<div>
					Remember me
				</div>
			</div>
			{
				!isLoading ?
					<button type='submit' className="w-full bg-[#2f2f31]/40 shadow-md hover:shadow-black hover:bg-[#2f2f31] cursor-pointer text-white/70 hover:text-white/90 text-base p-3 rounded-xl">Sign In</button>
					:
					<div className="text-center w-full bg-[#2f2f31]/40 shadow-md hover:shadow-black hover:bg-[#2f2f31] cursor-pointer text-white/70 hover:text-white/90 text-base py-3 rounded-xl mt-2"
					>
						<div
							className="inline-block h-3 w-3 animate-spin rounded-full border-4 border-solid border-white/70 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
					</div>
			}

			<div className="text-md text-center border-b-[0.1px] h-4 border-primary/30 my-1 mb-2 tracking-wide font-medium text-white/70">
				<span className='w-fit bg-background px-4'>
					OR
				</span>
			</div>
			<div className="text-center w-full bg-[#2f2f31]/40 shadow-md hover:shadow-black hover:bg-[#2f2f31] cursor-pointer text-white/70 hover:text-white/90 text-base py-3 rounded-xl mt-2" onClick={() => {
				router.push('/signup')
			}}>Sign Up</div>
			<div className="text-center w-full bg-[#2f2f31]/40 shadow-md hover:shadow-black hover:bg-[#2f2f31] cursor-pointer text-white/70 hover:text-white/90 text-base py-3 rounded-xl mt-2" onClick={() => {
				googleSignInHandler()
			}}>Google SignIn</div>
			{
				customErrors.length !== 0 &&
				<div className='text-sm text-red-500'>
					{customErrors}
				</div>
			}
		</form>
	)
}
export default SignIn
