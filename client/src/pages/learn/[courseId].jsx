import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('python', python);
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import CourseContent from "@/components/CourseContent";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default () => {
	const router = useRouter();
	const [courseId, setCourseId] = useState("");

	useEffect(() => {
		if (router.query.courseId) {
			setCourseId(router.query.courseId);
			setVal(localStorage.getItem(router.query.courseId));
			setTimeout(() => hljs.highlightAll(), 500);
		}
	}, [router]);

	const [courseContent, setCourseContent] = useState(true);
	const [val, setVal] = useState("");

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

			<main className="bg-dark-0">
				<div className="mt-[4rem] pb-[4rem] flex-col">
					<div className="py-[1.8rem] px-[1rem]"></div>
					<div className="mx-[15rem]">
						<div>
                            <CourseContent pid={courseId} />
                        </div>
					</div>
				</div>
			</main>
		</>
	);
};