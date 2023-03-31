import Head from "next/head";
import Navbar from "@/components/Navbar";

export default () => {
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
					{/*everything goes in here*/}
					<h1 className="text-blue-0 pb-[50rem]">Recommended</h1>
				</div>
			</main>
		</>
	);
};
