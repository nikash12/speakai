import {atomFamily} from 'recoil'

const audioSchema = atomFamily({
    key:"audioSchemma",
    default:(id)=>({
        id,
        fileName: "",
        blob: null,
        transcript: "",
        stats: {
            wordsPerMinute: 0,
            fillerWordCount: 0,
            totalDuration: "0s",
            confidence: 0,
        }
    })
})

export {audioSchema}