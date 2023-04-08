import Head from "next/head";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import Footer from "@/components/Footer";
import { useState } from "react";

export default () => {
	const [problems, setProblems] = useState([
		{ status: false, problemTitle: "Rotations in 3 Dimensions", problemLink: "/", editorialLink: "/" },
		{ status: true, problemTitle: "16 BIT S/W ONLY", problemLink: "/", editorialLink: "" },
		{ status: true, problemTitle: "2spooky4me", problemLink: "/", editorialLink: "/" },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/" },
	]);

	return (
		<>
			<Head>
				<title>PZOJ</title>
				<link rel="icon" href="/images/favicon.png" />
			</Head>

			<Navbar
				links={[
					{ text: "Home", url: "/" },
					{ text: "Problems", url: "/problems" },
					{ text: "Learn", url: "/learn" },
					{ text: "Recommended", url: "/recommended" },
				]}
			/>

			<main className="bg-dark-0 w-full">
				<div className="flex flex-row justify-center items-start relative w-4/5 mx-auto mt-[10rem] mb-[6rem]">
					<div className="grow px-10">
						<h1 className="mb-[2rem] text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-sky-500 font-bold text-4xl">Problems</h1>

						<Table
							data={problems}
						/>
					</div>

					{/* Add search bar here (search for questions and stuff like DMOJ) */}
					<div className="min-w-[25rem] mt-[4.5rem] px-10 flex flex-col justify-center items-start sticky top-[6rem]">
						<div className="bg-dark-1 rounded px-[1.5rem] py-[1.5rem] border border-border w-full">
							<h2 className="text-grey-1 text-xl font-semibold">Problem Search:</h2>

							{/* Search bar here */}
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};
