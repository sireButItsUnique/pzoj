import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}
