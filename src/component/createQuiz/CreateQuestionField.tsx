import { useContext, useEffect, useState } from "react";
import { useChangeQuestion, useFetchQuestion } from "../../hooks/useChangeQuizContext";
import CreateChoiceForm from "./CreateChoiceForm";
import { ZodErrorContext } from "./CreateQuizForm";


type prop = {
    index: number
    // error:error
}



const CreateQuestionField: React.FC<prop> = (prop: prop) => {
    const [content, setContent] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    
    const zodError = useContext(ZodErrorContext);
    const fetchQuestion = useFetchQuestion();
   
    const [contentError, setContentError] = useState<string>("");
    const [choiceError,setChoiceError] = useState<string>("");

    useEffect(() =>{
        setContentError('');
        setChoiceError('');

        if(zodError !== undefined){
            const errorOccurQuestions = zodError.issues.filter(is =>is.path.length >= 2 && is.path.length<=4);            
            for(let issue of errorOccurQuestions){
                let errorIndex = issue.path.find(p =>  typeof p === 'number') as number;
                let question = fetchQuestion(errorIndex);
                if(question.indexId === prop.index){
                    if(issue.path.includes('content'))
                        setContentError(issue.message);
                    if(issue.path.includes('choices'))
                        setChoiceError(issue.message);
                }
           }
        }
        } ,[zodError])
    
    const changeQuestion = useChangeQuestion();

    useEffect(() => {
        changeQuestion(content,comment,prop.index);

    }, [content, comment])

    return (
        <div className='CreateQuestionField'>
            <input type="textarea" placeholder="問題文を入力してください" onChange={(e) => setContent(e.target.value)} />
            <div className='error'>{contentError}</div>
            <CreateChoiceForm quesitonIndex={prop.index} />
            <div className='error'>{choiceError}</div>
            <input type="text" placeholder="回答後に表示されるコメントを入力してください" onChange={(e) => setComment(e.target.value)} />
        </div>
    )
}

export default CreateQuestionField;    