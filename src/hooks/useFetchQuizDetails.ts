import axios, { AxiosResponse } from 'axios';
import { useState } from "react";
import fetchQuizDetailsParam from "../type/fetchQuizDetailParam";
import quizDetail from '../type/quizDetail';

const QUIZ_DETAIL_URL: string = "/quizWeb/getQuizDetail";

function fetchQuizDetail(param: fetchQuizDetailsParam): Promise<AxiosResponse<quizDetail>> {
    return axios.get<quizDetail>(QUIZ_DETAIL_URL, { params: param });
}

const useFetchQuizDetail: () => [quizDetail|undefined, (param: fetchQuizDetailsParam) => void] = () => {
    const [quizDetail, setQuizDetail] = useState<quizDetail>();
    const setFetchQuizDetail = (param: fetchQuizDetailsParam) => {
        fetchQuizDetail(param).then(res => setQuizDetail(res.data));
    }
        return [quizDetail, setFetchQuizDetail];
}

export default useFetchQuizDetail;