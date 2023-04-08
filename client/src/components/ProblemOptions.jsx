import Image from "next/image"; 

const ProblemOptions = ({setEditorial, setExpanded, setSidePanel, setProblemStatement, setSubmissions}) => {
    return (
        <div className="z-10 flex-col bg-dark-3 rounded pt-[1rem] pb-[1rem] px-[1rem] border border-border"> 
            <button 
                className="flex hover:bg-dark-2 pl-[0.5rem] pr-[4.1rem] pb-[0.25rem] pt-[0.25rem] w-full" 
                onClick={() => {
                    setEditorial(false);
                    setProblemStatement(false);
                    setSubmissions(false);
                    setSidePanel(false);
                    setExpanded(false);
                }}
            >
                <Image src="/images/pin.png" width={24} height={24}/>
                <p1 className="ml-[0.5rem] text-grey-2">Full Editor</p1>
            </button>

            <button 
                className="flex transition duration-200 hover:bg-dark-2 pl-[0.5rem] pr-[1rem] pb-[0.25rem] pt-[0.25rem] w-full"
                onClick={() => {
                    setEditorial(false);
                    setProblemStatement(true);
                    setSubmissions(false);
                    setSidePanel(true);
                    setExpanded(false);
                }}   
            >
                <Image src="/images/pin.png" width={24} height={24}/>
                <p1 className="ml-[0.5rem] text-grey-2">Problem Statement</p1>
            </button>

            <button 
                className="flex hover:bg-dark-2 pl-[0.5rem] pr-[5.7rem] pb-[0.25rem] pt-[0.25rem]"
                onClick={() => {
                    setEditorial(false);
                    setProblemStatement(false);
                    setSubmissions(true);
                    setSidePanel(true);
                    setExpanded(false);
                }}
            >
                <Image src="/images/pin.png" width={24} height={24}/>
                <p1 className="ml-[0.5rem] text-grey-2">Submissions</p1>
            </button>

            <button 
                className="flex hover:bg-dark-2 pl-[0.5rem] pr-[5.7rem] pb-[0.25rem] pt-[0.25rem] w-full"
                onClick={() => {
                    setEditorial(true);
                    setProblemStatement(false);
                    setSubmissions(false);
                    setSidePanel(true);
                    setExpanded(false);
                }}
            >
                <Image src="/images/pin.png" width={24} height={24}/>
                <p1 className="ml-[0.5rem] text-grey-2">Editorial</p1>
            </button>
        </div>
    );
}

export default ProblemOptions;