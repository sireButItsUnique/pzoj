import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default () => {
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
				<div className="relative w-4/5 mx-auto mt-[10rem] mb-[6rem]">
					<h1 className="mb-[2rem] text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-sky-500 font-bold text-4xl">Practice Problems</h1>
				
					<div>
						
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};
