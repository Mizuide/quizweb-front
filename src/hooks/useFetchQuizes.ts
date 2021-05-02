import axios, { AxiosResponse } from 'axios';
import { useState } from "react";
import quiz from "../type/quiz";
import fetchQuizParam from "../type/fetchQuizParam";



const QUIZ_URL: string = "/quizWeb/getQuizes";

function fetchQuizes(param: fetchQuizParam): Promise<AxiosResponse<quiz[]>> {
    return axios.get<quiz[]>(QUIZ_URL, { params:param });

}

const useFetchQuizes = function (): [quiz[], (prop: fetchQuizParam) => void] {
    let [quizes, setQuizes] = useState<quiz[]>([]);
    let setFetchQuiz = function (prop: fetchQuizParam) {
        fetchQuizes(prop).
            then(res => quizes.concat(res.data)).then(newQuizes => setQuizes(newQuizes));
    }
    return [quizes, setFetchQuiz];
}



export default useFetchQuizes;