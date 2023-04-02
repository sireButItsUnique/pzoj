import Head from "next/head";
import Navbar from "@/components/Navbar";
import CourseBlob from "@/components/CourseBlob";
import CoursePanel from "@/components/CoursePanel";
import { useState } from "react";

export default () => {
    //<a href="https://imgbb.com/"><img src="" alt="Screenshot-1213" border="0" /></a>
	const [courses, setCourses] = useState([
		{ title: "Dynamic Programming", cover: "https://i.ibb.co/QbFMzcd/Screenshot-1213.png", courseId: "/learn/dQw4w9WgXcQ", description: "Dynamic programming is both a mathematical optimization method and a computer programming method. The method was developed by Richard Bellman in the 1950s and has found applications in numerous fields, from aerospace engineering to economics."},
		{ title: "text", cover: "/images/pzoj.png", courseId: "/learn/asdada", description: "this is a test course, not indicative of final product"},
		{ title: "text", cover: "/images/pzoj.png", courseId: "/learn/asdada", description: "this is a test course, not indicative of final product" },
		{ title: "text", cover: "/images/pzoj.png", courseId: "/learn/asdada", description: "this is a test course, not indicative of final product" },
		{ title: "text", cover: "/images/pzoj.png", courseId: "/learn/asdada", description: "this is a test course, not indicative of final product" },
	]);

	return (
		<>
			<Head>
				<title>PZOJ</title>
				<link rel="icon" href="/favicon.png" />
			</Head>

			<main className="bg-dark-0">
				<Navbar
					className=""
					links={[
						{ text: "Home", url: "/" },
						{ text: "Problems", url: "/problems" },
						{ text: "Learn", url: "/learn" },
						{ text: "Recommended", url: "/recommended" },
					]}
				/>

				<div className="pt-[4rem]">
                    <p1 className="text-grey-2 font-bold text-3xl ml-[12rem]">Your Courses</p1>

					{courses.map((course) => (
						<CourseBlob
							key={Math.random()}
							title={course.title}
							cover={course.cover}
                            description={course.description}
							courseId={course.courseId}
						/>
					))}

					<CoursePanel />
				</div>
			</main>
		</>
	);
};
