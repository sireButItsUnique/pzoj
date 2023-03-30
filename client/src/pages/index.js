import Head from "next/head";
import Navbar from "@/components/Navbar";

export default () => {
	return (
		<>
			<Head>
				<title>PZOJ</title>
			</Head>

			<main className="bg-dark-0">
				<Navbar
					links={[
						{ text: "PZOJ", url: "/PZOJ" },
						{ text: "PZOJ", url: "/PZOJ" },
						{ text: "PZOJ", url: "/PZOJ" },
					]}
				/>

				<div className="place-self-center content-center justify-center flex-col bg-dark-0">
					<h1 className="text-blue-0">PZOJ</h1>
				</div>
			</main>
		</>
	);
};
