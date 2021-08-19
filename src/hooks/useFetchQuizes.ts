import axios, { AxiosResponse } from 'axios';
import { useState } from "react";
import quiz from "../type/quiz";
import fetchQuizParam from "../type/fetchQuizParam";
import api from "../property/api.json"

type returnQuizesInfo = {
    count:number,
    quizes:quiz[]
}

function fetchQuizes(param: fetchQuizParam): Promise<AxiosResponse<returnQuizesInfo>> {
    return axios.post<returnQuizesInfo>(api.quiz.url, { ...param });

}

const useFetchQuizes: () => [returnQuizesInfo, (prop: fetchQuizParam) => void] = () => {
    const [quizes, setQuizes] = useState<returnQuizesInfo>({quizes:[],count:0});
    
    const setFetchQuiz = function (prop: fetchQuizParam) {
        fetchQuizes(prop).then(res => setQuizes(res.data));
    }

    return [quizes, setFetchQuiz];
}

export default useFetchQuizes;