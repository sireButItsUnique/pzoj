import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/button/PrimaryButton";
import CodeEditor from "@/components/CodeEditor";
import ProblemStatement from "@/components/ProblemStatement";
import ProblemSubmissions from "@/components/ProblemSubmissions";
import Head from "next/head";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export default () => {
    const router = useRouter();
    const [problemId, setProblemId] = useState("");

    useEffect(() => {
        if (router.query.problemId) {
            setProblemId(router.query.problemId);
            let newlen = localStorage.getItem(router.query.problemId + "lang");
            setLang(newlen || "cpp");
            setVal(localStorage.getItem(router.query.problemId + newlen));
        }
    }, [router]);

    const [showEditorial, setShowEditorial] = useState(false);
    const [problemStatement, setProblemStatement] = useState(true);

    const [expanded, setExpanded] = useState(false);
    const [direction, setDirection] = useState(0); // 0 means next click should be clockwise; 1 means next click should be counter clockwise

    const [val, setVal] = useState("");
    const [lang, setLang] = useState("cpp");

    const [results, setResults] = useState([]);

    const handleOnChange = (newlang, newval) => {
        if (newlang != lang) {
            setLang(newlang);
            setVal(localStorage.getItem(router.query.problemId + newlang));
            localStorage.setItem(problemId + "lang", newlang);
        } else {
            setVal(newval);
            localStorage.setItem(problemId + newlang, newval);
        }
    };

    return (
        <>
            <Head>
                <title>PZOJ</title>
                <link rel="icon" href="/images/favicon.png" />
            </Head>

            <Navbar
                className=""
                links={[
                    { text: "Home", url: "/" },
                    { text: "Problems", url: "/problems" },
                    { text: "Learn", url: "/learn" },
                    { text: "Recommended", url: "/recommended" },
                ]}
            />

            <main className="bg-dark-0 w-full flex flex-row justify-center items-center mt-[4.18rem]">
                <div className="max-w-[40%] w-[40%] absolute top-[4.188rem] bottom-0 left-0 min-h-[100vh]">
                    {problemStatement &&
                        <div>
                            <ProblemStatement pid={problemId} />
                        </div>
                    }
                </div>

                <div className="absolute top-[4.188rem] bottom-0 right-0 w-[60%] max-w-[60%] max-h-[calc(100%-120px)] px-8">
                    <CodeEditor val={val} lang={lang} onChange={handleOnChange} />
                </div>

                <div className="fixed bottom-[2rem] right-[4rem]">
                    <PrimaryButton
                        link="/"
                        target="_self"
                        text={
                            <span className="flex flex-row justify-center items-center">
                                <FontAwesomeIcon icon={faCode} className="inline-block text-xl w-[1.2rem] mr-2" /> Submit
                            </span>
                        }
                        bgColor="dark-1"
                        onClick={(e) => {
                            e.preventDefault();
                            let token = localStorage.getItem("token");
                            if (!token) {
                                router.push("/account");
                                return;
                            }
                            let ws = new WebSocket("ws://" + window.location.host + "/ws");
                            ws.onopen = () => {
                                ws.send(JSON.stringify({
                                    pid: problemId,
                                    lang: lang,
                                    code: val,
                                    token: token
                                }));
                            };
                            ws.onmessage = (msg) => {
                                let msgStr = msg.data;
                                if (msgStr.startsWith("error:") || msgStr.startsWith("IE")) {
                                    console.error(msg);
                                    return;
                                }
                                setResults(results => [...results, msgStr]);
                                results.push(msgStr);
                            };
                        }}
                    />
                </div>
            </main>
        </>
    );
};