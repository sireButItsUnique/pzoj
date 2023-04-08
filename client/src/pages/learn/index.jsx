import Head from "next/head";
import Navbar from "@/components/Navbar";
import CourseBlob from "@/components/CourseBlob";
import CoursePanel from "@/components/CoursePanel";
import Image from "next/image";
import { useState } from "react";

export default () => {
	const [courses, setCourses] = useState([
		{ title: "Dynamic Programming", cover: "https://i.ibb.co/QbFMzcd/Screenshot-1213.png", courseId: "/learn/dQw4w9WgXcQ", description: "Dynamic programming is both a mathematical optimization method and a computer programming method. The method was developed by Richard Bellman in the 1950s and has found applications in numerous fields, from aerospace engineering to economics." },
		{ title: "text", cover: "/images/pzoj.png", courseId: "/learn/asdada", description: "this is a test course, not indicative of final product" },
		{ title: "text", cover: "/images/pzoj.png", courseId: "/learn/asdada", description: "this is a test course, not indicative of final product" },
		{ title: "text", cover: "/images/pzoj.png", courseId: "/learn/asdada", description: "this is a test course, not indicative of final product" },
		{ title: "text", cover: "/images/pzoj.png", courseId: "/learn/asdada", description: "this is a test course, not indicative of final product" },
	]);

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

			<main className="bg-dark-0 w-full">
				<div className="flex flex-row justify-center items-center w-full">
					<div className="mt-[4rem] pb-[4rem] max-w-[60%] mr-auto">
						<h1 className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-sky-500 mt-[5rem] font-bold text-4xl">Your Courses</h1>
						{courses.map((course) => (
							<CourseBlob
								key={Math.random()}
								title={course.title}
								cover={course.cover}
								description={course.description}
								courseId={course.courseId}
								setCourses={setCourses}
								courses={courses}
							/>
						))}

						{!courses.length && <p1 className="ml-[12rem] text-grey-0">Uh oh! Looks like you have no courses. Try adding a course from the side panel.</p1>}
						{!courses.length && <div className="absolute top-[30%] left-[22%]">
							<Image src="/images/potato-sad.png" width={350} height={350} /> {/*this is temp img unless u guys wanna keep it*/}
						</div>}
					</div>

					<CoursePanel />
				</div>
			</main>
		</>
	);
};
