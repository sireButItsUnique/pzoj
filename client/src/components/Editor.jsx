import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = (props) => {
    const [val, setVal] = useState("");
    const handleChange = (val) => {
        setVal(val);
    }

    return (
        <div className="rounded-md w-full h-full shadow-4xl">
            <div className="border-none w-full bg-[#1b191f]">
                <select className="border-none bg-inherit outline-none text-grey-2">
                    <option value="cpp">C++</option>
                    <option value="cpp">C</option>
                    <option value="python">Python3</option>
                    <option value="javascript">Javascript</option>
                </select>
            </div>
            
            <Editor
                height={`100%`}
                width={`100%`}
                language={"cpp"}
                value={val}
                theme={"vs-dark"}
                defaultValue="// Write your code here! Input is given as a stream."
                onChange={handleChange}
            />
        </div>
    )
}

export default CodeEditor;