import React, { ReactElement, useContext, useEffect, useState } from "react";
import * as answerStatusConst from "../const/answerStatus";
import { question } from '../type/quizDetail'
import Choices from "./Choices";
import fetchAnswerParam from "../type/fetchAnswerParam";
import useFetchAnswer from "../hooks/useFetchAnswer";
import Result from "./Result";
import { Header, Segment } from "semantic-ui-react";

type questionProp = {
    questionNo:number;
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
            // setAnswerStatus(answerStatusConst.answerStatus.waiting);
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
            <Segment className='content'> 
                <Header as='h3'>{`第${prop.questionNo + 1}問`}</Header>
                {prop.question.content} </Segment>
            <Result comment={prop.question.comment} answerStatus={answerStatus} />
            <Choices choices={prop.question.choices} answer={answer} setAnswer={setAnswer} 
                choiceType={prop.question.choiceType} correctAnswer={correctAnswer} />
        </div>
    );
}

type prop = {
    questions: question[];
    countupNumOfCorrect:() => void; 
    setComplete:() => void;
}

export const answerStatusContext =
    React.createContext<[answerStatusConst.answerStatus, (answerStatus: answerStatusConst.answerStatus) => void]>
        ([answerStatusConst.answerStatus.none, (answerStatus: answerStatusConst.answerStatus) => console.log('notDefined')]);

const Questions: React.FC<prop> = (prop: prop) => {
    const maxSize: number = prop.questions.length;

    const [answerStatus, setAnswerStatus] = useState<answerStatusConst.answerStatus>(answerStatusConst.answerStatus.none);
    const [currentNum, setCurrentNum] = useState<number>(0);

    useEffect(() =>{
        if(answerStatus === answerStatusConst.answerStatus.correct){
            prop.countupNumOfCorrect();
        }
    },[answerStatus])

    //if user answer,display next question 
    const onClick = () => {
        if (answerStatus === answerStatusConst.answerStatus.none || answerStatus === answerStatusConst.answerStatus.waiting) {
            return false;
        } else if(currentNum + 1 < maxSize ){
            setCurrentNum(currentNum + 1);
            setAnswerStatus(answerStatusConst.answerStatus.none);
        }else if(currentNum + 1 === maxSize){
            prop.setComplete();
        }
    }
    const QuestionArray: ReactElement[] = [];
    prop.questions.forEach((q,index) => {
        console.log(index);
        QuestionArray.push(<Question questionNo={index} question={q} key={index}/>
        )});
    return (
        <div className='questions' onClick={onClick}>
            <answerStatusContext.Provider value={[answerStatus, setAnswerStatus]}>
                {QuestionArray[currentNum]}
            </answerStatusContext.Provider>
        </div>
    );
}

export default Questions;