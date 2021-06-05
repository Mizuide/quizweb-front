import { useContext, useEffect, useState } from 'react';
import { useChangeChoice } from '../../hooks/useChangeQuizContext';
import { createChoiceParam } from '../../type/createQuizParam';
import Choices from '../Choices';
import { QuizInfoContext } from './CreateQuizForm';


type prop = {
    questionIndex: number;
    choiceIndex: number;
}

const CreateChoiceField: React.FC<prop> = (prop: prop) => {
    const [content, setContent] = useState("");
    const changeChoice = useChangeChoice(prop.questionIndex);

    useEffect(() => {
        changeChoice(content , prop.choiceIndex);        
    }, [content])


    return (
        <div className='createChoiceField'>
            <input type="text" placeholder="選択肢を入力してください" onChange={(e) => setContent(e.target.value)} />
        </div>
    )
}

export default CreateChoiceField;