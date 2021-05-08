import React, { ReactElement, useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import useFetchQuizDetail from '../hooks/useFetchQuizDetails'
import fetchQuizDetailParam from '../type/fetchQuizDetailParam'
import QuizDescription from "./QuizDescription";

interface QuizScreen extends ReactElement { }

export type routerParam = {
    id: string
}

const QuizScreen: React.FC = () => {
    //this componet call from react-router
    const prop: routerParam = useParams<routerParam>();
    const fetchQuizDetailParam: fetchQuizDetailParam = {
        quizId: prop.id
    };

    const [quizDetail, setQuizDetail] = useFetchQuizDetail();
    const [screen, setScreen] = useState<ReactElement>();

    // useEffect(() => { setQuizDetail(fetchQuizDetailParam) }, [])
    // useEffect(() => { setScreen(<QuizDescription quiz={quizDetail} onClickStart={() => setScreen(<Quiz />) } />) }, [quizDetail])


    return (
        <div className="quizScreen">

        </div>
    )
}

export default QuizScreen;