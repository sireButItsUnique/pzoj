import Head from "next/head";
import Navbar from "@/components/Navbar";
import CourseBlob from "@/components/CourseBlob";
import { useState } from "react";

export default () => {
	const [courses, setCourses] = useState([
		{ title: "text", cover: "/pzoj.png", code: "/learn/asdada" },
		{ title: "text", cover: "/pzoj.png", code: "/learn/asdada" },
		{ title: "text", cover: "/pzoj.png", code: "/learn/asdada" },
		{ title: "text", cover: "/pzoj.png", code: "/learn/asdada" },
		{ title: "text", cover: "/pzoj.png", code: "/learn/asdada" },
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
					{courses.map((course) => (
						<CourseBlob
							key={Math.random()}
							title={course.title}
							cover={course.cover}
							code={course.code}
						/>
					))}
					{courses.map((course) => (
						<CourseBlob
							key={Math.random()}
							title={course.title}
							cover={course.cover}
							code={course.code}
						/>
					))}
				</div>
			</main>
		</>
	);
};
