import { Fragment } from 'react'
import FeaturedDiv from '@/app/components/featuredDiv'
import Image from 'next/image'
const BasePage = () => {
	return (
		<div className="">
			<div>
				<div className='flex md:flex-row flex-col-reverse p-4 py-2 w-full justify-between items-center gap-y-2'>
					<div className="flex flex-col gap-y-2 md:w-8/12 w-full">
						<div className='text-3xl tracking-wider'>
							Black Grimore
						</div>
						<div className='text-lg text-justify sm:tracking-wide'>
							Black Grimore is my personal digital garden. Where I share and save my knowledge. It would allow me to access my notes or guides
							anywhere and anytime.
						</div>
					</div>
					<div className="flex flex-col items-center justify-center gap-y-2">
						<Image unoptimized src="/images/grimoire.webp" width={0} height={0} className='h-full w-full md:h-[150px] md:w-[200px] ' />
						<span className="text-sm">
							Reference: Black Clover
						</span>
					</div>
				</div>
				<FeaturedDiv headingName={"Featured"} />
				<FeaturedDiv headingName={"Recent"} />
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
