import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } from "@fortawesome/free-solid-svg-icons";

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

            <main className="bg-dark-0 w-full pt-[4.18rem] flex flex-col justify-center items-center">
                <div className="px-6 py-8 bg-dark-1">
                    <div className="text-center">
                        <Image 
                            src="/images/pzoj.png"
                            width={70}
                            height={70}
                            className="m-auto"
                        />
                        <h1 className="mb-[2rem] text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-sky-500 font-bold text-4xl">PZOJ</h1>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};
