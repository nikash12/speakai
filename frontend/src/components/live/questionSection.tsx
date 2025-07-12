import {Card,CardContent} from '@/components/ui/card'
import Timer from './Timer'
import {  useRecoilValue } from 'recoil'
import { indexSchema, questions } from '@/recoil'



export default function QuestionSection(){
    const data = useRecoilValue(questions)
    console.log(data);
    const index = useRecoilValue(indexSchema)
    
    if (!data || !data[index]) {
    return (
      <div className="w-full h-full flex items-center justify-center text-lg p-4">
        No question available.
      </div>
    );
  }
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