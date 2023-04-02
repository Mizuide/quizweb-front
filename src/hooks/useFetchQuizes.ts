import axios from "./axios";
import { AxiosResponse } from "axios";
import { useState } from "react";
import * as api from "../const/api";
import fetchQuizParam from "../type/fetchQuizParam";
import quiz from "../type/quiz";
import tag from "../type/tag";

type returnQuizesInfo = {
    count: number,
    quizInfoList: { quiz: quiz, tags: tag[] }[]
}


const useFetchQuizes: () => [returnQuizesInfo, (prop: fetchQuizParam) => void] = () => {
    const [quizes, setQuizes] = useState<returnQuizesInfo>({ quizInfoList: [], count: 0 });

    const setFetchQuiz = function (prop: fetchQuizParam) {
        api.getQuizList(prop).then(res => setQuizes({
            quizInfoList: res.data.quizInfoList,
            count: res.data.count
        }));
    }

    return [quizes, setFetchQuiz];
}

export default useFetchQuizes;