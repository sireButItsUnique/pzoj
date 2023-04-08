import Navbar from "@/components/Navbar";
import CodeEditor from "@/components/Editor";
import ProblemStatement from "@/components/ProblemStatement";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default () => {
    const [sidePanel, setSidePanel] = useState(true);
    const [problemStatement, setProblemStatement] = useState(true);

    const [expanded, setExpanded] = useState(false);
	const [direction, setDirection] = useState(0); // 0 means next click should be clockwise; 1 means next click should be counter clockwise
    return (
        <>
			<Head>
				<title>PZOJ</title>
				<link rel="icon" href="/images/favicon.png" />
			</Head>

			<Navbar
				className=""
				links={[
					{ text: "Home", url: "/" },
					{ text: "Problems", url: "/problems" },
					{ text: "Learn", url: "/learn" },
					{ text: "Recommended", url: "/recommended" },
				]}
			/>

			<main className="bg-dark-0 w-full h-full flex flex-col">
                <div className={`fixed top-[4.2rem] bottom-[0rem] ${sidePanel ? "right-[47vw]": "right-[0vw]"} left-[0vw]`}>
                    <CodeEditor />
                </div>

                <button 
                    className={`fixed bottom-[2rem] left-[2rem] bg-none 
                    ${direction ? "animate-spin-clockwise" : "animate-spin-counterclockwise"}`}
                    onClick={() => {
                        setExpanded(!expanded);
                        setDirection((prev) => !prev);
                    }}
                >
                    <Image src="/images/settings.png" width={30} height={30} />
                </button>
                
                { //sadasdasd
                    problemStatement &&
                    <div className="absolute top-[5rem] right-[0vw] left-[55vw]">
                        <ProblemStatement />
                    </div>
                }
			</main>
		</>
    );
}