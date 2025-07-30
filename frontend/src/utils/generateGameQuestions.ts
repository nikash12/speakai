import axios from 'axios'
const generateGameQuestions = async({data}:{data:{mode:string}})=>{

    try{
        console.log("Sending data to backend:", data);
        const res = await axios.post('http://localhost:2001/api/interview/game/questions',{
            mode:data.mode
        })
        return res.data.questions;
    }catch(err){
        console.log(err);
    }
}

export default generateGameQuestions