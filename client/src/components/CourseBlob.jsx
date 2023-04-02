import Link from "next/link";
import Image from "next/image";
import CourseOptions from "./CourseOptions";
import { useState } from "react";

const CourseBlob = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [spin, setSpin] = useState(false);

    return (
        <div className="relative bg-dark-1 rounded flex my-[1.5rem] ml-[12rem] mr-[36rem] px-[1rem] py-[1rem]">
            <Image className="rounded" src={props.cover} width={100} height={100} style={{objectFit: 'scale-down'}}/>
            
            <button 
                className={`absolute right-4 ${spin && "animate-spin"} bg-white`} 
                onClick={() => {
                    setExpanded(!expanded);
                    setSpin(true);
                    setTimeout(() => {
                        setSpin(false);
                    }, 180)
                }
            }>

                <Image src="/images/settings.png" width={24} height={24} />
            </button>

            {expanded && <CourseOptions />}   
            {expanded && <button 
                className={`fixed left-0 top-0 z-[9] pb-[100vh] pr-[100vw]`} 
                onClick={() => {
                    setExpanded(!expanded);
                    setSpin(true);
                    setTimeout(() => {
                        setSpin(false);
                    }, 180)
                }
            }></button>}         
            
            <div className="flex-col ml-[1rem]">
                <Link className="text-grey-1 font-semibold text-lg hover:underline hover:text-grey-2" href={props.courseId}>{props.title}</Link>
                <p className="text-grey-0">{props.description}</p>
            </div>
            
        </div>
    );
}

export default CourseBlob;