import Head from "next/head";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import PrimaryButton from "@/components/button/PrimaryButton";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
//asd
export default () => {
	const [problems, setProblems] = useState([
		{ status: false, problemTitle: "Rotations in 3 Dimensions", problemLink: "/problems/areyoukidding", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: true, problemTitle: "16 BIT S/W ONLY", problemLink: "/", editorialLink: "", tag: "Data Structures", rating: 1 },
		{ status: true, problemTitle: "2spooky4me", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 2 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
		{ status: false, problemTitle: "Mispelling", problemLink: "/", editorialLink: "/", tag: "Data Structures", rating: 5 },
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
						<h1 className="mb-[2rem] text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-sky-500 font-bold text-4xl">Problems</h1>
						<Table
							data={problems}
						/>
					</div>

					<div className="min-w-[25rem] mt-[4.5rem] px-10 flex flex-col justify-center items-start sticky top-[6rem]">
						<div className="bg-dark-1 rounded px-[1.5rem] py-[1.5rem] border border-border w-full mb-[1rem]">
							<h2 className="text-grey-1 text-xl font-semibold mb-[1rem]">Find Problem:</h2>
							<div className="text-grey-1 bg-dark-2 px-4 py-2 border border-border flex flex-row justify-center items-center rounded-lg">
								<FontAwesomeIcon icon={faSearch} className="text-xl inline-block w-[1.2rem] mr-4" />

								<input type="text" className="outline-none bg-dark-2" placeholder="Search for problem" />
							</div>
						</div>

						<div className="bg-dark-1 rounded px-[1.5rem] py-[1.5rem] border border-border w-full">
							<h2 className="text-grey-1 text-xl font-semibold mb-[1rem]">Random Problem:</h2>

							<PrimaryButton
								link="/"
								target="_self"
								text={
									<span><FontAwesomeIcon icon={faShuffle} className="text-xl inline-block w-[1.2rem] mt-[-0.23rem] mr-0.5" /> Random</span>
								}
								bgColor="dark-1"
							/>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};
