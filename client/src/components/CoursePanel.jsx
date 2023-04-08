import { useState } from "react";
import Link from "next/link";

const CoursePanel = () => {
    const [links, setLinks] = useState([
        { link: "https://www.geeksforgeeks.org/c-magicians-stl-algorithms/", text: "c++ <algorithm>" },
        { link: "https://www.geeksforgeeks.org/vector-in-cpp-stl/", text: "c++ <vector>" },
        { link: "https://www.bigocheatsheet.com/", text: "Common time complexities" },
        { link: "https://codeforces.com/blog/entry/21344", text: "Expected time complexities" },
    ]);
    const [progress, setProgress] = useState("50%");

    return (
        <div className="min-w-[25rem] mt-[4.5rem] px-10 flex flex-col justify-center items-start sticky top-[6rem]">
            <div className="bg-dark-1 rounded px-[1.5rem] py-[1.5rem] border border-border w-full">
                <p1 className="text-grey-1 text-xl font-semibold">Course Progress:</p1>

                <div className="z-1 rounded-xl bg-grey-2 mt-[1rem] h-[1.2rem] w-full">
                    <div className={`rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 h-[1.2rem] w-[${progress}]`} />
                </div>
            </div>

            <div className="bg-dark-1 rounded px-[1.5rem] py-[1.5rem] my-[1rem] border border-border w-full">
                <p1 className="text-grey-1 text-xl font-semibold block">Add Courses:</p1>
                <button className="bg-transparent outline-border outline-dashed text-grey-1 text-3xl font-extrabold rounded mt-[1rem] w-full h-[5rem] transition ease-in-out duration-200 hover:bg-dark-0">+</button>
            </div>

            <div className="bg-dark-1 rounded px-[1.5rem] py-[1.5rem] border border-border w-full">
                <p1 className="text-grey-1 text-xl font-semibold">Quick References:</p1>
                <div className="">
                    {links.map((link, idx) => <>
                        <Link rel="noopener noreferrer" target="_blank" href={link.link} key={idx} className="block text-blue-400 transition ease-in-out duration-200 hover:text-blue-500">
                            {link.text}
                        </Link>
                    </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursePanel;
