import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = (props) => {
    const [val, setVal] = useState("");
    const handleChange = (val) => {
        setVal(val);
    }

    return (
        <div className="rounded-md w-full h-full shadow-4xl">
            <Editor
                height={`100%`}
                width={`100%`}
                language={"javascript"}
                value={val}
                theme={"vs-dark"}
                defaultValue="// Write your code here! Input is given as a stream."
                onChange={handleChange}
            />
        </div>
    )
}

export default CodeEditor;