import axios from './axios';
import { useState } from "react";
import api from "../property/api.json";
import fetchAnswerParam from "../type/fetchAnswerParam";

const useFetchAnswer: () => [number | undefined, (param: fetchAnswerParam) => void] = () => {
    const [answer, setAnswer] = useState<number>();

    const setFetchAnswer = (param: fetchAnswerParam) => {
        axios.post<number>(api.answer.url, { ...param }).then(res => setAnswer(res.data));;
    }

    return [answer, setFetchAnswer];
}

export default useFetchAnswer;
