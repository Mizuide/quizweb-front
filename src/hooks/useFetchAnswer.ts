import axios, { AxiosResponse } from 'axios';
import { useState } from "react";
import fetchAnswerParam from "../type/fetchAnswerParam";

const ANSWER_URL: string = "/quizWeb/answer";
const useFetchAnswer: () => [number | undefined, (param: fetchAnswerParam) => void] = () => {
    const [answer, setAnswer] = useState<number>();

    const setFetchAnswer = (param: fetchAnswerParam) => {
        axios.get<number>(ANSWER_URL, { params: param }).then(res => setAnswer(res.data));
    }

    return [answer, setFetchAnswer];
}

export default useFetchAnswer;
