import React, { ReactElement } from "react";
import question from '../type/question'

interface Question extends ReactElement{ }

type prop = {
    question: question;
}

const Question: React.FC<prop> = (prop: prop) => {

    return (<div className='question'/>);
}

export default Question;