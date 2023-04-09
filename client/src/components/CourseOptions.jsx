import Image from "next/image"; 
const CourseOptions = (props) => {
    return (
		<div className="absolute right-[-8rem] top-[3rem] z-10 flex-col bg-dark-3 rounded pt-[1rem] pb-[1rem] px-[1rem] border border-border">
			<button
				className="flex transition duration-200 hover:bg-dark-2 pl-[0.5rem] pr-[1rem] pb-[0.25rem] pt-[0.25rem]"
				onClick={() => {
					props.setCompleted(!props.completed);
					props.setExpanded(false);
				}}>
				<Image src="/images/mark.png" width={24} height={24} />
				<p1 className="ml-[0.5rem] text-grey-2">Mark as Done</p1>
			</button>

			<button 
				className="flex transition duration-200 hover:bg-dark-2 pl-[0.5rem] pr-[5.7rem] pb-[0.25rem] pt-[0.25rem]"
				onClick={() => {
					if (!props.isPin) { //pinning
						let buf = [...props.courses];
						props.setPinned([...props.pinned, buf[props.id]]);
						localStorage.setItem("pinned", JSON.stringify([...props.pinned, buf[props.id].courseId]));
						console.log(JSON.parse(localStorage.getItem("pinned")));
						buf.splice(props.id, 1);

						props.setCourses(buf);
						props.setExpanded(false);
					} else { //unpinning
						let buf = [...props.pinned];
						props.setCourses([...props.courses, buf[props.id]]);
						buf.splice(props.id, 1);
						localStorage.setItem("pinned",JSON.stringify(buf));

						props.setPinned(buf);
						props.setExpanded(false);
					}
				}}
			>
				<Image src="/images/pin.png" width={24} height={24} />
				<p1 className="ml-[0.5rem] text-grey-2">Pin</p1>
			</button>
		</div>
	);
}

export default CourseOptions;