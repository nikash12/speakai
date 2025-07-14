import {useForm} from 'react-hook-form'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
import generateQuestions from '@/utils/generateQuestions';
import { useSetRecoilState } from 'recoil';
import { indexSchema, questions } from '@/recoil';
import { useNavigate } from 'react-router-dom';

type Inputs={
  title:string,
  description:string,
  resume?:File,
  mode:string
}
export default function InterviewSetupForm() {
  const navigate = useNavigate()
  const {register,handleSubmit,watch,setValue} = useForm<Inputs>()
  const selectedMode = watch("mode")
  const [fileName, setFileName] = useState('');
  const setQuestion = useSetRecoilState(questions);
  const setIndex = useSetRecoilState(indexSchema)
  function submitFun(data:Inputs){
    generateQuestions({data}).then((res)=>{
      console.log(res);
      setQuestion(res)});
      setIndex(0);
      navigate("/live")
  }
  return (
    <>
      <form onSubmit={handleSubmit((data:Inputs)=>{submitFun(data)})} style={{ fontFamily: "'Montserrat', sans-serif" }} className=' dark:bg-white/8 md:w-1/2 flex h-1/2 flex-wrap flex-col justify-around p-5 md:text-2xl m-5 text-xl'>
        <div className='flex  w-full flex-col  p-3 ' >
          <Label className='pb-2'>Enter Job Title:</Label>
          <Input type='text' className='md:w-1/2' {...register('title')}></Input>
        </div>

        <div className='flex  md:flex-row flex-col p-3'>
          <Label className='pb-2'>Resume (optional): </Label>

            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue('resume', file);
                  setFileName(file.name);
                }
              }}
            />

          <Button asChild variant="ghost" >
            <label htmlFor="resume" className="cursor-pointer bg-blue-500 md:ml-5">
              Upload
            </label>
          </Button>
          {fileName && (
            <span className="text-sm text-muted-foreground mt-1 truncate max-w-[200px]">{fileName}</span>
          )}
        </div>
        <div className='flex w-full flex-col p-3 '>
          <Label className='pb-2'>Description:</Label>
          <Input type='text' {...register('description')} className='md:h-[20vh] md:w-3/4'></Input>
        </div>


        <div className='flex md:w-1/2 w-full flex-col p-3'>
          <Label className='pb-2'>Mode:</Label>
          <Select onValueChange={(val) => setValue("mode", val)} value={selectedMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Interview Mode</SelectLabel>
                <SelectItem value="mock">mock</SelectItem>
                <SelectItem value="Realtime">Realtime</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>



        <div className="w-full flex  p-3">
          <Button type="submit" className="w-fit px-6 text-base">
            Submit
          </Button>
        </div>
        
      </form>
    </>
  );
}
