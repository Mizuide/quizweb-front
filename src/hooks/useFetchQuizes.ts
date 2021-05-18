import axios, { AxiosResponse } from 'axios';
import { useState } from "react";
import quiz from "../type/quiz";
import fetchQuizParam from "../type/fetchQuizParam";

const QUIZ_URL: string = "/quizWeb/quiz";

function fetchQuizes(param: fetchQuizParam): Promise<AxiosResponse<quiz[]>> {
    return axios.post<quiz[]>(QUIZ_URL, { ...param });

}

const useFetchQuizes: () => [quiz[], (prop: fetchQuizParam) => void] = () => {
    const [quizes, setQuizes] = useState<quiz[]>([]);
    const setFetchQuiz = function (prop: fetchQuizParam) {
        fetchQuizes(prop).
            then(res => {
                if (prop.lastQuiz === null) {
                    return res.data;
                } else {
                    return quizes.concat(res.data);
                }
            }).then(newQuizes => setQuizes(newQuizes));
    }

    return [quizes, setFetchQuiz];
}

export default useFetchQuizes;