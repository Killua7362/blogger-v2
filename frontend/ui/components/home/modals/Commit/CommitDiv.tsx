'use client'
import { IoTrashBinSharp } from "react-icons/io5";

const CommitDiv = ({ tempDB, setTempDB, setModifyID }: { tempDB: redisCommits, setTempDB: React.Dispatch<React.SetStateAction<redisCommits>>, setModifyID: React.Dispatch<React.SetStateAction<Set<string>>> }) => {

	return (
		<div className="w-full h-full border-primary/30 border-[0.1px] rounded-xl tracking-wide font-normal text-md overflow-y-auto">
			{Object.keys(tempDB).map((key, _) => {
				return tempDB[key].history.length !== 0 && (
					<div className="p-2 sm:p-4 m-2 rounded-md flex sm:flex-row flex-col gap-x-4 gap-y-2 justify-between px-10 border-white/30 border-[0.1px] text-lg" id={`commitItems${key}`}>
						<div>
							<div>
								{tempDB[key].original.title}
							</div>
							<div className="text-sm text-white/70 flex gap-x-2">
								<div>
									Created: {new Date(tempDB[key].original.created_at || 0).toLocaleDateString('en-US')}
								</div>
								<div>
									Updated: {new Date(tempDB[key].original.updated_at || 0).toLocaleDateString('en-US')}
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-y-2">
							{
								Array.from(tempDB[key].history).reverse().map((e, i) => {
									return (
										<div className="flex items-center gap-x-4" key={`commitActions+${key}+${i}`}>
											<IoTrashBinSharp className="text-red-500 hover:text-red-400 cursor-pointer"
												onClick={() => {
													setModifyID(prev => {
														return new Set(prev).add(key)
													})
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
