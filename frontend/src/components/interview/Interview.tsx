import Navbar from "../layout/navbar/Navbar";
import InterviewSetupForm from './InterviewSetupForm'
export default function Interview(){
    return(
        <div className="min-h-screen w-full bg-[url('/bg-light.svg')] dark:bg-[url('/bg-dark.svg')] bg-cover bg-no-repeat bg-center">
            <Navbar/>
            <InterviewSetupForm/>
        </div>
    )
}