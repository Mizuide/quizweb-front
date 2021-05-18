import React, { ReactElement, useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom'
import useFetchQuizDetail from '../hooks/useFetchQuizDetails'
import fetchQuizDetailParam from '../type/fetchQuizDetailParam'
import FinalResult from "./FinalResult";
import Questions from "./Questions";
import QuizDescription from "./QuizDescription";


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


    const [numOfCorrect, setNumOfCorrect] = useState<number>(0);
    let correctRef = useRef<number>();
    correctRef.current = numOfCorrect;

    const [finishFlg, setFinishFlg] = useState<boolean>(false);

    useEffect(() => { setQuizDetail(fetchQuizDetailParam) }, [])
    useEffect(() => {
        if (quizDetail !== undefined) {
            setScreen(<QuizDescription quizDetail={quizDetail} onClickStart={() =>
                setScreen(<Questions questions={quizDetail.questions}
                    countupNumOfCorrect={() => {
                        if (correctRef.current !== undefined) {
                            setNumOfCorrect(correctRef.current + 1)
                        }
                    }} setComplete={() => setFinishFlg(true)} />)} />)
        }
    }, [quizDetail])

    useEffect(() => {
        if (finishFlg && quizDetail !== undefined) {
            setScreen(<FinalResult numOfCorrect={numOfCorrect} quiz={quizDetail} />);
        }
    }, [finishFlg]);

    return (
        <div className="quizScreen">
            {screen}
        </div>
    )
}

export default QuizScreen;