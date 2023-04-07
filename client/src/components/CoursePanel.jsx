import { useState } from "react";
import Link from "next/link";

const CoursePanel = () => {
    const [links, setLinks] = useState([
        { link: "https://www.geeksforgeeks.org/c-magicians-stl-algorithms/", text: "c++ <algorithm>" },
        { link: "https://www.geeksforgeeks.org/vector-in-cpp-stl/", text: "c++ <vector>" },
        { link: "https://www.bigocheatsheet.com/", text: "Common time complexities" },
        { link: "https://codeforces.com/blog/entry/21344", text: "Expected time complexities" },
    ]);

    return (
        <div className="bg-dark-1 rounded fixed top-[11.3rem] left-[63rem] px-[1.5rem] py-[1.5rem]">
            <div>
                <p1 className="text-grey-1 text-xl font-semibold">Course Progress:</p1>
                <div className="z-1 rounded-xl bg-grey-2 mt-[1rem] mb-[1.5rem] h-[1.2rem] w-[16rem] border-none">
                    {/* <div className="rounded-xl bg-green-400 h-[1.2rem] w-[50%]" /> */}

                    <div className="rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 h-[1.2rem] w-[50%]" />
                </div>
                <p1 className="text-grey-1 text-xl font-semibold">Add Courses:</p1> <br />
                <button className="bg-transparent outline-grey-1 outline-dashed text-grey-1 text-3xl font-extrabold rounded mt-[1rem] mb-[1.5rem] w-[16rem] h-[6rem] transition ease-in-out duration-[800ms] hover:bg-dark-0">+</button> <br />
                <p1 className="text-grey-1 text-xl font-semibold">Quick References:</p1>
                <div className="">
                    {links.map((link, idx) => <>
                        <Link rel="noopener noreferrer" target="_blank" href={link.link} key={idx} className="text-blue-400 transition ease-in-out duration-200 hover:text-blue-500">
                            {link.text}
                        </Link>
                        <br />
                    </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CoursePanel;
