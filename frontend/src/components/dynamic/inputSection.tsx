import RecorderUtil from "@/utils/recorderUtil";
import { Button } from "../ui/button";
import { useRecoilState, } from "recoil";
import { indexSchema, } from "@/recoil";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InputSection(){
    const [index,setIndex] = useRecoilState(indexSchema)
    const [showEndButton,setShowEndButton] = useState(false)
    const navigate = useNavigate()
    function handleEnd(){
        setIndex(0);
        setShowEndButton(false)
        navigate("/report")
    }
    return(
        <div className="flex flex-col">
            <RecorderUtil />
            
            <div className="flex justify-center gap-4 mt-6">
                <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-full shadow hover:bg-gray-100 transition"
                    onClick={() => setIndex(index === 0 ? 0 : index - 1)}
                    disabled={index === 0}
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-full shadow hover:bg-gray-100 transition"
                    onClick={() => setIndex(index + 1)}
                >
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
            <Button className="bg-red-500 w-50 m-auto h-10" onClick={()=>setShowEndButton(true)}>End Session</Button>
            {showEndButton&&
                <div className="fixed inset-0 z-50 flex items-center justify-center w-[50vw] m-auto">
                    <Alert variant="destructive" className="h-[25vh]">
                    <Button className="absolute right-1" onClick={()=>setShowEndButton(false)}>X</Button>
                    <AlertTitle>Are your sure wanna end?</AlertTitle>
                    <AlertDescription>
                        Your interview will end here!!
                    </AlertDescription>
                    <Button className="w-[10vw]" onClick={handleEnd}>END</Button>
                    </Alert>
                </div>
            }
        </div>
    )
}