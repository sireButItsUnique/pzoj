import Link from "next/link";
import Image from "next/image";

const CourseBlob = (props) => {

    return (
        <div className="bg-dark-1 rounded flex my-[1.5rem] ml-[12rem] mr-[36rem] px-[1rem] py-[1rem]">
            <Image className="rounded" src={props.cover} width={100} height={100} style={{objectFit: 'scale-down'}}/>
            <button>
                <Image src="/pzoj.png" width={50} height={50} />
            </button>

            <div className="flex-col ml-[1rem]">
                <Link className="text-grey-1 font-semibold text-lg hover:underline hover:text-grey-2" href={props.courseId}>{props.title}</Link>
                <p className="text-grey-0">{props.description}</p>
            </div>
            
        </div>
    );
}

export default CourseBlob;