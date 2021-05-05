import React, { ReactElement, useState } from "react";
import choice from '../type/choice'


interface Choices extends ReactElement { }

type choiceProp = {
    choice: choice;
    setCorrect: (correct: boolean) => void;
}

const Choice: React.FC<choiceProp> = (prop: choiceProp) => {
    return (
        <div className='choice' onClick={() => prop.setCorrect(prop.choice.correct_flg)}>
            {prop.choice.content}
        </div>
    )
}

type prop = {
    choices: choice[];
    setCorrect: (correct: boolean) => void;
}


const Choices: React.FC<prop> = (prop: prop) => {
    const [answeredFlg, setAnsweredFlg] = useState<boolean>(false);
    const answer = (correct :boolean) => {
        setAnsweredFlg(true);
        prop.setCorrect(correct);
    }

    let choices = [];

    for (let choice of prop.choices) {
        choices.push(Choice({ choice: choice, setCorrect: answer}));
    }

    return (<div className='choices'>{choices}</div>);

}

export default Choices;