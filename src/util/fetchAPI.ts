import axios, { AxiosResponse } from 'axios';
import quiz from '../type/quiz'

const QUESTION_URL:string = "/quizWeb/getQuestions"


export function fetchQuestions(page:number):Promise<AxiosResponse<quiz[]>>{

   return axios.get<quiz[]>(QUESTION_URL);

}