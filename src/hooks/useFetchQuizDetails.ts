import axios from "./axios";
import { AxiosResponse } from "axios";
import { useState } from "react";
import api from "../property/api.json";
import fetchQuizDetailsParam from "../type/fetchQuizDetailParam";
import quizDetail from '../type/quizDetail';


function fetchQuizDetail(param: fetchQuizDetailsParam): Promise<AxiosResponse<quizDetail>> {
    return axios.get<quizDetail>(api.quizDetail.url, { params: param });
}

const useFetchQuizDetail: () => [quizDetail | undefined, (param: fetchQuizDetailsParam) => void] = () => {
    const [quizDetail, setQuizDetail] = useState<quizDetail>();
    const setFetchQuizDetail = (param: fetchQuizDetailsParam) => {

        fetchQuizDetail(param).then(res => setQuizDetail(res.data));
    }
    return [quizDetail, setFetchQuizDetail];
}

export default useFetchQuizDetail;