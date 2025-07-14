import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Hero(){
    const navigate = useNavigate()
    return(
        <div className="bg-[url('/ccchaos-light-fixed.svg')] dark:bg-[url('/ccchaos.svg')]  bg-contain bg-no-repeat bg-center h-[60vh] md:h-[80vh] w-full flex flex-col ">
            <div className="m-auto flex flex-col">
                <h1 className="text-3xl md:text-[2.9rem] text leading-tight m-auto font-bold">Speak with Confidence.</h1>
                <h4 className="text-[12px] md:text-[1rem] leading-tight m-auto">Real-time analysis for interviews, pitches, and more.</h4>
                <Button className="m-auto mt-6 w-[30vw] md:w-[20vw]" onClick={()=>navigate("/interview")}>Try Interview</Button>
            </div>
        </div>
    )
}