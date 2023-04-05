const CoursePanel = () => {
	return (
		<div className="bg-dark-1 rounded fixed top-[11.3rem] right-[12rem] px-[1.5rem] py-[1.5rem]">
			<div>
				<p1 className="text-grey-1 text-xl font-semibold">Progress:</p1>
				<div className="z-1 rounded-xl bg-grey-2 mt-[1rem] px-[8rem] py-[0.6rem]">
                    <div className="bg-grey-0 px-[100%] py-[100%] z-2" />
                </div>
			</div>
		</div>
	);
};

export default CoursePanel;
