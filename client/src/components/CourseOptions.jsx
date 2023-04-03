import Image from "next/image"; 
const CourseOptions = (props) => {

    return (
        <div className="absolute right-[-8rem] top-[3rem] z-10 flex-col bg-dark-3 rounded pt-[1rem] pb-[1rem] px-[1rem]">
            <button 
                className="flex hover:bg-dark-2 pl-[0.5rem] pr-[4.1rem] pb-[0.25rem] pt-[0.25rem]" 
                onClick={() => {
                    let buf = props.courses;
                    for (let i = 0; i < buf.length; i++) {
                        console.log(buf[i].courseId);
                        if (buf[i].courseId == props.courseId) {
                            buf.splice(i, 1);
                            break;
                        }
                    }

                    props.setCourses([...buf]);
                }}
            >
                <Image src="/images/delete.png" width={24} height={24}/>
                <p1 className="ml-[0.5rem] text-[#ab1432]">Delete</p1>
            </button>

            <button 
                className="flex hover:bg-dark-2 pl-[0.5rem] pr-[1rem] pb-[0.25rem] pt-[0.25rem]"
                onClick={() => {
                    props.setCompleted(!props.completed);
                    props.setExpanded(false);
                }}   
            >
                <Image src="/images/mark.png" width={24} height={24}/>
                <p1 className="ml-[0.5rem] text-grey-2">Mark as Done</p1>
            </button>

            <button className="flex hover:bg-dark-2 pl-[0.5rem] pr-[5.7rem] pb-[0.25rem] pt-[0.25rem]">
                <Image src="/images/pin.png" width={24} height={24}/>
                <p1 className="ml-[0.5rem] text-grey-2">Pin</p1>
            </button>
        </div>
    );
}

export default CourseOptions;