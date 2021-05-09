import React, { ReactElement, useContext, useEffect, useState } from "react";
import * as answerStatusConst from "../const/answerStatus";
import { question } from '../type/quizDetail'
import Choices from "./Choices";
import fetchAnswerParam from "../type/fetchAnswerParam";
import useFetchAnswer from "../hooks/useFetchAnswer";
import Result from "./Result";

type questionProp = {
    key:number;
    question: question;
}

const Question: React.FC<questionProp> = (prop: questionProp) => {
    const [answerStatus, setAnswerStatus] = useContext(answerStatusContext);

    const [answer, setAnswer] = useState<number>();
    const [correctAnswer, fetchAnswer] = useFetchAnswer();

    //fetch correctAnswer after select choice 
    useEffect(() => {
        if (answer !== undefined) {
            let param: fetchAnswerParam = {
                questionId: prop.question.id,
                selectiionNo: answer
            };
            fetchAnswer(param);
            setAnswerStatus(answerStatusConst.answerStatus.waiting);
        }
    }, [answer])

    //judge answer
    useEffect(() => {
        if (correctAnswer !== undefined) {
            if (correctAnswer === answer) {
                setAnswerStatus(answerStatusConst.answerStatus.correct);
            } else {
                setAnswerStatus(answerStatusConst.answerStatus.incorrect);
            }
        }
    }, [correctAnswer])
    
    return (
        <div >
            <div className='content'>{prop.question.content} </div>
            <Choices choices={prop.question.choices} answer={answer} setAnswer={setAnswer}
                correctAnswer={correctAnswer} />
            <Result comment={prop.question.comment} answerStatus={answerStatus} />
        </div>
    );
}

type prop = {
    questions: question[];
}

const answerStatusContext =
    React.createContext<[answerStatusConst.answerStatus, (answerStatus: answerStatusConst.answerStatus) => void]>
        ([answerStatusConst.answerStatus.none, (answerStatus: answerStatusConst.answerStatus) => console.log('notDefined')]);

const Questions: React.FC<prop> = (prop: prop) => {
    const maxSize: number = prop.questions.length;

    const [answerStatus, setAnswerStatus] = useState<answerStatusConst.answerStatus>(answerStatusConst.answerStatus.none);

    const [currentNum, setCurrentNum] = useState<number>(0);

    //if user answer,display next question 
    const onClick = () => {
        if (answerStatus === answerStatusConst.answerStatus.none || answerStatus === answerStatusConst.answerStatus.waiting) {
            return false;
        } else if(currentNum < maxSize ){
            setCurrentNum(currentNum + 1);
            setAnswerStatus(answerStatusConst.answerStatus.none);
        }else if(currentNum === maxSize){

        }
    }
    const QuestionArray: ReactElement[] = [];
    prop.questions.forEach((q,index) => QuestionArray.push(<Question question={q} key={index}/>));
    return (
        <div className='questions' onClick={onClick}>
            <div className='header'>
                {`第${currentNum + 1}問`}
            </div>
            <answerStatusContext.Provider value={[answerStatus, setAnswerStatus]}>
                {QuestionArray[currentNum]}
            </answerStatusContext.Provider>
        </div>
    );
}

export default Questions;