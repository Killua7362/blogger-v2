import { IoTrashBinSharp } from "react-icons/io5";

const CommitDiv = () => {
	return (
		<div className="w-full h-full border-primary/30 border-[0.1px] rounded-xl tracking-wide font-normal text-md overflow-y-auto">
			{new Array(15).fill(0).map(() => {
				return (
					<div className="p-4 m-2 rounded-md flex gap-x-4 items-center divide-x-[0.1px] divide-primary/30">
						<IoTrashBinSharp className="text-2xl text-red-500" />
						<div className="pl-4 flex sm:flex-row flex-col justify-between items-center w-full gap-y-2 divide-x-[0.1px] divide-primary/30">
							<div className="text-lg">
								Title of the post
							</div>
							<div className="flex sm:flex-col gap-x-2 text-sm pl-4">
								<div>Action: Delete</div>
								<div>Updated On: Today</div>
								<div>Created On: Yesterday</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
export default CommitDiv
