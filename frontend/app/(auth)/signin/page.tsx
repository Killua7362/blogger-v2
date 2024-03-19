'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const SignIn = () => {
	const router = useRouter()

	const emailValidate = async (email: string) => {
		return true;
	}

	const passwordValidate = async (password: string) => {
		if (!(errors.email)) {
			return false
		}
		return true
	}
	const SignInSchema = z.object({
		email: z.string().email().refine(async (value) => {
			const exist = await emailValidate(value);
			return exist
		}, { message: 'Email already exist or Signed in with Google', checkAsync: true }),
		password: z.string().min(6).max(12).refine(async (value) => {
			const exist = await passwordValidate(value)
			return exist
		}, { message: 'Password is wrong', checkAsync: true })
	})
	type SignInSchemaType = z.infer<typeof SignInSchema>

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<SignInSchemaType>({ resolver: zodResolver(SignInSchema) })

	return (
		<form className="2xl:w-2/12 xl:w-3/12 lg:w-4/12 md:w-5/12 sm:w-6/12 xs:w-8/12 w-9/12 p-7 flex flex-col justify-center border-primary/30 border-[0.1px] rounded-xl gap-y-4 text-lg shadow-lg shadow-black bg-background" autocomplete="off" onSubmit={handleSubmit((data) => {
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
			<button type='submit' className="w-full bg-[#2f2f31]/40 shadow-md hover:shadow-black hover:bg-[#2f2f31] cursor-pointer text-white/70 hover:text-white/90 text-base p-3 rounded-xl">Sign In</button>

			<div className="text-md text-center border-b-[0.1px] h-4 border-primary/30 my-1 mb-2 tracking-wide font-medium text-white/70">
				<span className='w-fit bg-background px-4'>
					OR
				</span>
			</div>
			<div className="text-center w-full bg-[#2f2f31]/40 shadow-md hover:shadow-black hover:bg-[#2f2f31] cursor-pointer text-white/70 hover:text-white/90 text-base py-3 rounded-xl mt-2" onClick={() => {
				router.push('/signup')
			}}>Sign Up</div>
		</form>
	)
}
export default SignIn
