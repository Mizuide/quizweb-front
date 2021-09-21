import React, { ReactElement, useContext } from "react";
import { Card } from "semantic-ui-react";
import * as answerStatusConst from "../const/answerStatus";
import { choice } from '../type/quizDetail';
import { answerStatusContext } from './Questions';

type choiceProp = {
    key: number;
    choice: choice;
    answer: number | undefined;
    setAnswer: (no: number) => void;
}


const Choice: React.FC<choiceProp> = (prop: choiceProp) => {

    const [, setAnswerStatus] = useContext(answerStatusContext);
    return (
        <Card fluid color='blue' key={prop.key} header={prop.choice.content}
            onClick={() => {
                setAnswerStatus(answerStatusConst.answerStatus.waiting);
                if (prop.answer === undefined) {
                    prop.setAnswer(prop.choice.selectionNo);
                }
            }
            }>
        </Card>
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
    let style = {}
    if (prop.answer && prop.correct) {
        //選択した値が正解の場合の選択した値
        style = {background:"aqua"};
    } else if (prop.answer && !prop.correct) {
        //選択した値が不正解の場合の選択肢の値
        style = {background:"red"};
    } else if (!prop.answer && prop.correct) {
        //選択した値が不正解の場合の不正解の値
        style = {background:"aqua"};
    }


    return (
        <Card style={style} fluid color='blue' header={prop.choice.content} key={prop.key}  />

    )
}

interface Choices extends ReactElement { }

type prop = {
    choices: choice[];
    answer: number | undefined;
    setAnswer: (no: number) => void;
    correctAnswer: number | undefined;
}

const Choices: React.FC<prop> = (prop: prop) => {
    let choices: (ReactElement | null)[] = [];
    if (prop.correctAnswer === undefined || prop.answer === undefined) {
        prop.choices.forEach((choice, index) => {
            choices.push(Choice({ key: index, choice: choice, answer: prop.answer, setAnswer: prop.setAnswer }));
        });
    } else {
        prop.choices.forEach((choice, index) => {
            choices.push(ChoiceResult({ key: index, choice: choice, answer: choice.selectionNo === prop.answer, correct: choice.selectionNo === prop.correctAnswer }));
        });
    }

    return (
        <Card.Group>
            {choices}
        </Card.Group>
    );

}



export default Choices;