'use client'
import { IoTrashBinSharp } from "react-icons/io5";

import { useRecoilState } from 'recoil'
import { redisCommits } from '@/atoms/states'

const CommitDiv = ({ tempDB, setTempDB }: { tempDB: any, setTempDB: any }) => {

	return (
		<div className="w-full h-full border-primary/30 border-[0.1px] rounded-xl tracking-wide font-normal text-md overflow-y-auto">
			{Object.keys(tempDB).map((key, _) => {
				return tempDB[key].history.length !== 0 && (
					<div className="p-4 m-2 rounded-md flex gap-x-4 gap-y-2 justify-between px-10 border-white/30 border-[0.1px] text-lg">
						<div>
							<div>
								{tempDB[key].original.title}
							</div>
							<div className="text-sm text-white/70">
								CreatedOn: {tempDB[key].original.createdOn}
							</div>
						</div>
						<div className="flex flex-col gap-y-2">
							{
								Array.from(tempDB[key].history).reverse().map((e, i) => {
									return (
										<div className="flex items-center gap-x-4">
											<IoTrashBinSharp className="text-red-500 hover:text-red-400 cursor-pointer"
												onClick={() => {
													setTempDB(prev => {
														return {
															...prev,
															[key]: {
																...prev[key],
																history: [...Array.from(tempDB[key].history).splice(0, tempDB[key].history.length - i - 1)]
															}
														}
													})
												}}
											/>
											<div>
												{e.action}
											</div>
										</div>
									)
								})
							}
						</div>
					</div>
				)
			})}
		</div >
	)
}
export default CommitDiv
