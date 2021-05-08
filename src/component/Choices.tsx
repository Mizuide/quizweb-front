import React, { ReactElement, useState } from "react";
import { choice } from '../type/quizDetail'
import * as answerStatusConst from "../const/answerStatus";

type choiceProp = {
    key: number;
    choice: choice;
    // answerState: [number | undefined, (no: number) => void];
    answer: number|undefined;
    setAnswer: (no: number) => void;
}


const Choice: React.FC<choiceProp> = (prop: choiceProp) => {
    // const [answer, setAnswer] = prop.answerState;
    return (
        <div className='choice' key={prop.key} onClick={() => {
            if (prop.answer === undefined) {
                prop.setAnswer(prop.choice.selection_no);
            }
        }
        }>
            {prop.choice.content}
        </div>
    )
}


type choiceResultProp = {
    key: number,
    choice: choice;
    answer: boolean;
    correct: boolean;
}


const ChoiceResult: React.FC<choiceResultProp> = (prop: choiceResultProp) => {
    let className: string = 'none';

    if (prop.answer && prop.correct) {
        className = 'success';
    } else if (prop.answer && !prop.correct) {
        className = 'faile';
    } else if (!prop.answer && prop.correct) {
        className = "correctAnswer";
    }

    return (
        <div key={prop.key} className={`choice ${className}`} >
            {prop.choice.content}
        </div>
    )
}

interface Choices extends ReactElement { }

type prop = {
    choices: choice[];
    // answerState: [number | undefined, (no: number) => void];
    answer: number | undefined;
    setAnswer: (no: number) => void;
    correctAnswer: number | undefined;
}

const Choices: React.FC<prop> = (prop: prop) => {
    let choices: (ReactElement | null)[] = [];
    // const [answer, setAnswer] = prop.answerState;
    if (prop.correctAnswer === undefined || prop.answer === undefined) {
        prop.choices.forEach((choice, index) => {
            choices.push(Choice({ key: index, choice: choice, answer: prop.answer, setAnswer: prop.setAnswer }));
        });
    } else {
        prop.choices.forEach((choice, index) => {
            choices.push(ChoiceResult({ key: index, choice: choice, answer: choice.selection_no === prop.answer, correct: choice.selection_no === prop.correctAnswer }));
        });
    }

    return (<div className='choices'>
        {choices}
        </div>);

}



export default Choices;