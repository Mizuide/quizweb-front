import axios from './axios';
import api from "../property/api.json";
import createQuizParam from "../type/createQuizParam";

import { AxiosResponse } from "axios";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GUEST_ID } from '../const/const';


// ログインユーザによる認証
function fetchEditQuizParam(id: number): Promise<AxiosResponse<createQuizParam>> {
    return axios.get<createQuizParam>(api.getEditParamByUser.url, { params: { quizId: id } });
}

const useFetchEditQuizParam: () => [createQuizParam, (id: number, password?: string) => void] = () => {
    const [createQuizParam, setQuizParam] = useState<createQuizParam>(
        {
            id: 0,
            thumbnail: undefined,
            title: '',
            description: '',
            createUserId: GUEST_ID,
            questions: [],
            tags: [],
        });
    const history = useHistory();

    const setFetchQuiz = function (id: number, password?: string) {
        fetchEditQuizParam(id).then(res => setQuizParam(res.data)).catch(e => history.push('/editerror'));
    }

    return [createQuizParam, setFetchQuiz];
}

export default useFetchEditQuizParam;