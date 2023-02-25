import axios from './axios';
import api from "../property/api.json";
import createQuizParam from "../type/createQuizParam";

import { AxiosResponse } from "axios";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


// ログインユーザによる認証
function fetchEditQuizParam(id: number): Promise<AxiosResponse<createQuizParam>> {
    return axios.get<createQuizParam>(api.getEditParamByPassword.url, { params: { id: id } });
}

function fetchEditQuizParamByPassword(id: number, password: string): Promise<AxiosResponse<createQuizParam>> {
    return axios.get<createQuizParam>(api.getEditParamByUser.url, { params: { id: id, password: password } });
}

const useFetchEditQuizParam: () => [createQuizParam | undefined, (id: number, password?: string) => void] = () => {
    const [createQuizParam, setQuizParam] = useState<createQuizParam | undefined>(undefined);
    const history = useHistory();

    const setFetchQuiz = function (id: number, password?: string) {
        if (password !== undefined) {
            fetchEditQuizParamByPassword(id, password).then(res => setQuizParam(res.data)).catch(e => history.push('/editerror'));
        } else {
            fetchEditQuizParam(id).then(res => setQuizParam(res.data)).catch(e => history.push('/editerror'));
        }
    }

    return [createQuizParam, setFetchQuiz];
}

export default useFetchEditQuizParam;