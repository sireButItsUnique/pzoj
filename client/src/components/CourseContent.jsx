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
		if (router.query.courseId) {
			let cid = router.query.courseId;
			axios.get("/api/courses/" + cid).then((res) => {
				setContent(res.data);
			}).catch((err) => {
				console.error(err);
			});
		}
	}, [router]);

	return (
		<>
			<div id="course" >
				<InlineTex texSeperator="${1}" texContent={content} />
			</div>
		</>
	);
};