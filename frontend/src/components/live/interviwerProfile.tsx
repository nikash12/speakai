
export default function InterviewrProfile(){
    const title = localStorage.getItem("title") || "waiting.."
    const mode = localStorage.getItem("mode") || "waiting.."
    return(
        <div className="flex flex-col justify-center h-[40vh] items-center">
            <div className="bg-amber-300 w-50 h-50"></div>
            <h2 className="m-1"><span className="font-bold">Job Title:</span>{title}</h2>
            <h2 className="m1"><span className="font-bold">Interview Mode:</span>{mode}</h2>
        </div>
    )
}