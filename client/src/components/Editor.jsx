import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = (props) => {
    const [val, setVal] = useState("");
    const handleChange = (val) => {
        setVal(val);
    }

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height="85vh"
                width={`100%`}
                language={"javascript"}
                value={val}
                defaultValue="// some comment"
                onChange={handleChange}
            />
        </div>
    )
}

export default CodeEditor;