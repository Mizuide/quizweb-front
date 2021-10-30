import React, { ReactElement, useContext } from "react";
import { Card, Image } from "semantic-ui-react";
import * as answerStatusConst from "../const/answerStatus";
import choiceType from "../type/choiceType";
import { choice } from '../type/quizDetail';
import { answerStatusContext } from './Questions';
import no_image from '../img/no_image.png';
import { SemanticWIDTHS } from "semantic-ui-react/dist/commonjs/generic";


type choiceProp = {
    key: number;
    choice: choice;
    choiceType: choiceType;
    answer: number | undefined;
    setAnswer: (no: number) => void;
}


const Choice: React.FC<choiceProp> = (prop: choiceProp) => {
    console.log(prop.choiceType);
    const [, setAnswerStatus] = useContext(answerStatusContext);
    if (prop.choiceType === choiceType.single) {
        return (
            <Card fluid color='blue' key={prop.key} header={prop.choice.content}
                onClick={() => {
                    setAnswerStatus(answerStatusConst.answerStatus.waiting);
                    if (prop.answer === undefined) {
                        prop.setAnswer(prop.choice.selectionNo);
                    }
                    window.scroll({top: 0, behavior: 'smooth'});
                }
                }>
            </Card>
        )
    } else if (prop.choiceType === choiceType.image) {
        const url = '/quizWeb/img/choice/' + prop.choice.content;
        return (
            <Card color='blue' onClick={() => {
                setAnswerStatus(answerStatusConst.answerStatus.waiting);
                if (prop.answer === undefined) {
                    prop.setAnswer(prop.choice.selectionNo);
                }
                window.scroll({top: 0, behavior: 'smooth'});
            }
            } key={prop.key} header={prop.choice.content}>
                <Image rounded bordered src={no_image} />
            </Card>
        )
    }
    return (<></>)
}


type choiceResultProp = {
    key: number,
    choice: choice;
    choiceType: choiceType;
    answer: boolean;
    correct: boolean;
}


const ChoiceResult: React.FC<choiceResultProp> = (prop: choiceResultProp) => {
    let style = {}
    if (prop.answer && prop.correct) {
        //選択した値が正解の場合の選択した値
        style = { background: "aqua" };
    } else if (prop.answer && !prop.correct) {
        //選択した値が不正解の場合の選択肢の値
        style = { background: "red" };
    } else if (!prop.answer && prop.correct) {
        //選択した値が不正解の場合の不正解の値
        style = { background: "aqua" };
    }

    if (prop.choiceType === choiceType.single) {
        return (
            <Card style={style} fluid color='blue' header={prop.choice.content} key={prop.key} />

        )
    } else if (prop.choiceType === choiceType.image){
        const url = '/quizWeb/img/choice/' + prop.choice.content;
        return(
            <Card  style={style} key={prop.key}  header={prop.choice.content}>
                <Image style={{}} rounded bordered centered src={no_image} />
            </Card>
        )
    }
    return <></>
}

interface Choices extends ReactElement { }

type prop = {
    choices: choice[];
    choiceType: choiceType;
    answer: number | undefined;
    setAnswer: (no: number) => void;
    correctAnswer: number | undefined;
}

const Choices: React.FC<prop> = (prop: prop) => {
    let choices: (ReactElement | null)[] = [];
    if (prop.correctAnswer === undefined || prop.answer === undefined) {
        prop.choices.forEach((choice, index) => {
            choices.push(Choice({ key: index, choice: choice, answer: prop.answer, setAnswer: prop.setAnswer, choiceType: prop.choiceType }));
        });
    } else {
        prop.choices.forEach((choice, index) => {
            choices.push(ChoiceResult({ key: index, choice: choice, answer: choice.selectionNo === prop.answer, correct: choice.selectionNo === prop.correctAnswer, choiceType: prop.choiceType }));
        });
    }
    let rowNum = 1;
    if (prop.choiceType === choiceType.image)
        rowNum = 2;
    return (
        <Card.Group itemsPerRow={rowNum as SemanticWIDTHS}>
            {choices}
        </Card.Group>
    );

}



export default Choices;