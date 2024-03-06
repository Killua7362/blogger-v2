import { Fragment } from 'react'

const BasePage = () => {
	return (
		<div className="">
			<div>
				<div className='flex flex-col gap-y-2 p-6'>
					<div className='text-3xl tracking-wider'>
						Black Grimore
					</div>
					<div className='text-lg text-justify tracking-wide'>
						Black Grimore is my personal digital garden. Where I share and save my knowledge. It would allow me to access my notes or guides
						anywhere and anytime.
					</div>
				</div>
				<div className="text-2xl uppercase border-b-[0.1px] h-4 border-white/30 mt-4">
					<span className='w-fit bg-background px-6'>
						Featured
					</span>
				</div>
				<div className="mt-5 flex flex-col">
					{
						new Array(5).fill(0).map(() => {
							return (
								<div className='flex flex-col gap-y-2 border-white/30 rounded-xl p-6 py-4'>
									<div className='flex w-full justify-between'>
										<div className='text-2xl tracking-wider uppercase'>
											Post title
										</div>
										<div className='text-lg'>
											today
										</div>
									</div>
									<div className='flex gap-x-2'>
										<div className='text-xs bg-secondary p-1 rounded-xl px-3'>
											ML
										</div>
										<div className='text-xs bg-secondary p-1 rounded-xl px-3'>
											WEB DEV
										</div>
									</div>
									<div className='text-lg text-justify text-white/80 font-light tracking-wide'>
										This is the description of this post and it states that this post is really really good, I am not gonna lie its the best
									</div>
									<div className='text-white/80 font-light'>
										word count: 300
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default BasePage

//title
//descriptoin
//date
//word count
//tags
