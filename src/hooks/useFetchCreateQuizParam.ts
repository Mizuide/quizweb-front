import * as api from "../const/api";

import { useState } from 'react';


const useFetchCreateQuizParam: () => [api.newQuizRes, () => void] = () => {
    const [createQuizRes, setCreateQuizRes] = useState<api.newQuizRes>({ quizId: 0, createUserId: 0 })
    const setFetchQuiz = function () {
        api.newQuiz().then(res => setCreateQuizRes({ ...createQuizRes, quizId: res.data.quizId, createUserId: res.data.createUserId }));
    }
    return [createQuizRes, setFetchQuiz];
}

export default useFetchCreateQuizParam;