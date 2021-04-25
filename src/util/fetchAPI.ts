import axios, { AxiosResponse } from 'axios';
import quiz from '../type/quiz';
import question from '../type/question';

const QUIZ_URL:string = "/quizWeb/getQuizes";
const QUESTION_URL:string = "/quizWeb/getQuestion";

export function fetchQuizs(page:number):Promise<AxiosResponse<quiz[]>>{
   return axios.get<quiz[]>(QUIZ_URL,{params:{params:{page:page}}});

}

export function fetchQuestions(quizId:string):Promise<AxiosResponse<question[]>>{
   return axios.get<question[]>(QUESTION_URL,{params:{quizId:quizId}});
}