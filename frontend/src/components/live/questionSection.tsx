import {Card,CardContent} from '@/components/ui/card'
import Timer from './Timer'
import { useRecoilValue } from 'recoil'
import { questions } from '@/recoil'



export default function QuestionSection({index}:{index:number}){
    const data = useRecoilValue(questions)
    console.log(data);
    
    return(
        <div className="w-full h-full border text-[1.5em] overflow-auto flex flex-col">
            {/* <Timer duration={2}/> */}
            <Card className='h-full '>
                <CardContent>
                    <h2 className=" font-semibold">{"Q"+(index+1)+" )  "}{data[index].question} </h2>
                </CardContent>
            </Card>

        </div>
    )
}