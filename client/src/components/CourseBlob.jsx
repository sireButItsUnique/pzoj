import Link from "next/link";
import Image from "next/image";

const CourseBlob = (props) => {

    return (
        <div className="bg-dark-1 flex my-[1.5rem] ml-[12rem] mr-[36rem] px-[1rem] py-[1rem]">
            <Image src={props.cover} width={100} height={100}/>
            <Link href={props.code}>{props.title}</Link>
        </div>
    );
}

export default CourseBlob;