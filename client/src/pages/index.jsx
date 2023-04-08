import Head from "next/head";
import Dice from "@/components/Dice";
import Navbar from "@/components/Navbar";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';


export default () => {
	return (
		<>
			<Head>
				<title>PZOJ</title>
				<meta
					name="description"
					content="Learn competitive programming and solve programming problems!"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/images/favicon.png" />
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
					<h1 className="text-grey-2 text-7xl font-bold mr-[24rem]">Master Competitive Programming.</h1>
				</div>
				<div className="absolute top-[4rem] bottom-0 right-0 left-0">
					<Canvas >
						<OrbitControls />
						<ambientLight args={["#ffffff", 0.5]} />
						<directionalLight args={["#ffffff", 0.5]} position={[-3, 8, 1]} />
						<Dice />
					</Canvas>
				</div>
			</main>
		</>
	);
};
