import axios from 'axios'
const generateQuestions = async({data}:{data:{title:string,description:string,mode:string,resume?:File}})=>{

    try{
        console.log("Sending data to backend:", data);
        const res = await axios.post('http://localhost:2001/api/interview/questions',{
            title:data.title,
            description:data.description,
            mode:data.mode
        })
        return res.data.questions;
    }catch(err){
        console.log(err);
    }
}

export default generateQuestions