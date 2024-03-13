import { RxCross2 } from "react-icons/rx";

const FilterModal = () => {
	return (
		<div className="p-6 w-[24rem] border-primary/40 border-[0.1px] rounded-xl flex flex-col bg-background " onClick={(e) => {
			e.stopPropagation()
		}}>
			<div className="flex w-full justify-between items-center">
				<div className="text-xl">
					Filter
				</div>
				<div>
					<RxCross2 />
				</div>
			</div>
			<div>
				By Tags
			</div>
		</div>
	)
}

export default FilterModal
