import { useRouter } from "next/router";
import { InlineTex } from "react-tex";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default (props) => {
	const router = useRouter();
	const [content, setContent] = useState("");

	useEffect(() => {
		if (router.query.problemId) {
			let pid = router.query.problemId;
			axios.get("/api/problem/" + pid + "/editorial").then((res) => {
				setContent(res.data);
			}).catch((err) => {
				console.error(err);
			});
		}
	}, [router]);

	return (
		<>
			<div className="w-full px-8 pt-4 pb-8 overflow-y-scroll max-h-[calc(100vh-112px)]" id="problem-editorial-container">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-sky-500 font-bold text-4xl">Editorial</h1>
            <hr className="my-4 border-b border-border" />

				<div id="editorial" >
					<InlineTex texSeperator="${1}" texContent={content} />
				</div>
			</div>
		</>
	);
};