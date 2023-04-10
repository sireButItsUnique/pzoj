import { useState } from "react";
import Link from "next/link";

const CoursePanel = (props) => {
    const [links, setLinks] = useState([
        { link: "https://www.geeksforgeeks.org/c-magicians-stl-algorithms/", text: "C++ <algorithm>" },
        { link: "https://www.geeksforgeeks.org/vector-in-cpp-stl/", text: "C++ <vector>" },
        { link: "https://www.bigocheatsheet.com/", text: "Common time complexities" },
        { link: "https://codeforces.com/blog/entry/21344", text: "Expected time complexities" },
    ]);
    const progress = Math.floor((props.done / 3) * 100);
    const width = `${"w-[" + progress + "%]"}`;
    console.log(`${"w-[" + progress + "%]"}`);

    return (
        <div className="min-w-[25rem] mt-[4.5rem] px-10 flex flex-col justify-center items-start sticky top-[6rem]">
            <div className="bg-dark-1 rounded px-[1.5rem] py-[1.3rem] border border-border w-full">
                <p1 className="text-grey-1 text-xl font-semibold">Course Progress:</p1>

                <div className="z-1 rounded bg-grey-2 mt-[1rem] h-[1.2rem] w-full">
                    <div className={`rounded bg-gradient-to-br from-emerald-400 to-sky-500 h-[1.2rem] ${width}`} />
                </div>
            </div>

            <div className="bg-dark-1 rounded px-[1.5rem] py-[1.3rem] mt-[1rem] border border-border w-full">
                <p1 className="text-grey-1 text-xl font-semibold">Quick References:</p1>
                <div className="mt-[0.6rem]">
                    {links.map((link, idx) => <>
                        <Link rel="noopener noreferrer" target="_blank" href={link.link} key={idx} className="block text-blue-1 transition ease-in-out duration-200 hover:text-blue-0">
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
