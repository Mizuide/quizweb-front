import axios, { AxiosResponse } from 'axios';


const QUESTION_URL:string = "/quizWeb/getQuestions"


export type question =[{
    id:String,
    content:String
}]

export function fetchQuestion():Promise<AxiosResponse<question>>{
   return axios.get<question>(QUESTION_URL);
}