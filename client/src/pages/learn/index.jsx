import axios from "axios";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import CourseBlob from "@/components/CourseBlob";
import CoursePanel from "@/components/CoursePanel";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";

export default () => {
	const [courses, setCourses] = useState([]);
	const [pinned, setPinned] = useState([]);
	const [done, setDone] = useState(0);

	useEffect(() => {
		axios.get("/api/courses").then(async (res) => {
			let pinnedStorage;
			if (localStorage.getItem("pinned")) {
				pinnedStorage = JSON.parse(localStorage.getItem("pinned"));
			} else {
				localStorage.setItem("pinned", "[]");
				pinnedStorage = [];
			}
			let courseList = await Promise.all(res.data.map(async (p) => {
				let bool = false;
				for (let i = 0; i < pinnedStorage.length; i++) {
					if (pinnedStorage[i] == p.cid) {
						bool = true;
						break;
					}
				}
				if (pinnedStorage && bool) {
					setPinned([...pinned, {
						title: p.title,
						cover: '/images/' + p.cid + '.png',
						courseId: p.cid,
						description: p.description,
					}]);
					return null;
				} else {
					return {
						title: p.title,
						cover: '/images/' + p.cid + '.png',
						courseId: p.cid,
						description: p.description,
					};
				}
			}));
			courseList = courseList.filter((p) => p !== null);
			setCourses(courseList);
		}).catch((err) => {
			console.error(err);
		});
	}, []);

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
				<div className="flex flex-col w-4/5 mx-auto mt-[10rem] mb-[6rem]">
					<div className="flex flex-row justify-center items-start relative">
						<div className="grow px-10">
							<h1 className="mb-[2rem] text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-sky-500 font-bold text-4xl">Your Courses</h1>
							{pinned.map((course, idx) => (
								<CourseBlob
									key={idx}
									id={idx}
									title={course.title}
									cover={course.cover}
									description={course.description}
									courseId={course.courseId}
									setCourses={setCourses}
									courses={courses}
									pinned={pinned}
									setPinned={setPinned}
									isPin={true}
									done={done} 
									setDone={setDone}
								/>
							))}

							{courses.map((course, idx) => (
								<CourseBlob
									key={idx}
									id={idx}
									title={course.title}
									cover={course.cover}
									description={course.description}
									courseId={course.courseId}
									setCourses={setCourses}
									courses={courses}
									pinned={pinned}
									setPinned={setPinned}
									isPin={false}
									done={done} 
									setDone={setDone}
								/>
							))}

							{!courses.length && !pinned.length && <div className="text-grey-0">
								<p>Uh oh! Looks like you have no courses.</p>
								<p className="mb-[2rem]">Try adding a course from the side panel.</p>

								<Image src="/images/potato-sad.png" width={350} height={350} className="ml-[-3rem]" /> {/*this is temp img unless u guys wanna keep it*/}
							</div>}
						</div>

						<CoursePanel done={done} setDone={setDone}/>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};
