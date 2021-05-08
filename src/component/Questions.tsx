import React, { ReactElement, useEffect, useState } from "react";
import * as answerStatusConst from "../const/answerStatus";
import { question } from '../type/quizDetail'
import Choices from "./Choices";
import fetchAnswerParam from "../type/fetchAnswerParam";
import useFetchAnswer from "../hooks/useFetchAnswer";
import Result from "./Result";

type prop = {
    questions: question[];
}
const Questions: React.FC<prop> = (prop: prop) => {
    const maxSize: number = prop.questions.length;

    const [currentNum, setCurrentNum] = useState<number>(0);
    const [answerStatus, setAnswerStatus] = useState<answerStatusConst.answerStatus>(answerStatusConst.answerStatus.none);

    const [answer, setAnswer] = useState<number>();
    const [correctAnswer, fetchAnswer] = useFetchAnswer();

    //fetch correctAnswer after select choice 
    useEffect(() => {
        if (answer !== undefined) {
            let param: fetchAnswerParam = {
                questionId: prop.questions[currentNum].id,
                selectiionNo: answer
            };
            fetchAnswer(param);
            setAnswerStatus(answerStatusConst.answerStatus.waiting);
        }
    }, [answer])


    //judge answer
    useEffect(() => {
        if (correctAnswer !== undefined) {
            if (correctAnswer === correctAnswer) {
                setAnswerStatus(answerStatusConst.answerStatus.correct);
            } else {
                setAnswerStatus(answerStatusConst.answerStatus.incorrect);
            }
        }
    }, [correctAnswer])

    //if user answer,display next question 
    const onClick = () => {
        if (answerStatus === answerStatusConst.answerStatus.none || answerStatus === answerStatusConst.answerStatus.waiting) {
            return false;
        } else {
            setCurrentNum(currentNum + 1);
            setAnswerStatus(answerStatusConst.answerStatus.none);
        }
    }

    return (
        <div className='questions' onClick={onClick}>
            <div className='content'>{prop.questions[currentNum].content} </div>
            <Choices choices={prop.questions[currentNum].choices} answer={answer} setAnswer={setAnswer}
                correctAnswer={correctAnswer} />
            <Result comment={prop.questions[currentNum].comment} answerStatus={answerStatus} />
        </div>
    );
}

export default Questions;