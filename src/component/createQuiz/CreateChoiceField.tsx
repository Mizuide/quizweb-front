import { useContext, useEffect, useState } from 'react';
import { useChangeChoice, useFetchChoice, useFetchQuestion } from '../../hooks/useChangeQuizContext';
import { ZodErrorContext } from './CreateQuizForm';
import css from "../../css/createQuizForm.module.scss"
import ErrorZone from "./ErrorZone";


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

    const zodError = useContext(ZodErrorContext);
    const fetchQuestion = useFetchQuestion();
    const fetchChoice = useFetchChoice();

    const [contentError, setContentError] = useState<string>("");

    useEffect(() =>{
        setContentError('');
        if(zodError !== undefined){
            const errorOccurQuestions = zodError.issues.filter(is =>is.path.length >= 5);            
            for(let issue of errorOccurQuestions){
                let errorIndex = issue.path.filter(p =>  typeof p === 'number') as number[] ;
                let question = fetchQuestion(errorIndex[0]);
                if(question.indexId === prop.questionIndex){
                    let choice = fetchChoice(errorIndex[0],errorIndex[1]);
                    if(choice.indexId === prop.choiceIndex){
                        setContentError(issue.message);
                    }   
                }
           }
        }
        } ,[zodError])
    return (
        <div className={css.createChoiceField}>
            <input type="text" className={css.oneLineInput} placeholder="選択肢を入力してください" onChange={(e) => setContent(e.target.value)} />
            <ErrorZone errorMessage={contentError}/>
        </div>
    )
}

export default CreateChoiceField;