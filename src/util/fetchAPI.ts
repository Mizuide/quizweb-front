import axios, { AxiosResponse } from 'axios';


const QUESTION_URL:string = "/quizWeb/getQuestion"


export type question ={
    id:String,
    content:String
}

 
export function fetchQuestion(id:number):Promise<AxiosResponse<question>>{
   return axios.get<question>(QUESTION_URL,{params:{'id':id}});
}
