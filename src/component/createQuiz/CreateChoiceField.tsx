import { useContext, useState } from 'react';
import { createChoiceParam } from '../../type/createQuizParam';
import Choices from '../Choices';
import { QuizInfoContext } from './CreateQuizForm';


type prop = {
    questionIndex: number;
    choiceIndex: number;
}

const CreateChoiceField: React.FC<prop> = (prop: prop) => {

    const [quiz, setQuiz] = useContext(QuizInfoContext);

    const setContent = (value: string) => {
        quiz.questions[prop.questionIndex].choices[prop.choiceIndex].content = value;
    };

    return (
        <div className='createChoiceField'>
            <input type="text" placeholder="選択肢を入力してください" onChange={(e) => setContent(e.target.value)} />
        </div>
    )
}

export default CreateChoiceField;