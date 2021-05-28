import { ReactElement, useContext, useRef, useState } from "react";
import createQuizParam, { createQuestionParam } from "../../type/createQuizParam"
import { QuizInfoContext } from "./CreateQuizForm"
import CreateQuestionField from "./CreateQuestionField";


type prop = {

}

const CreateQuestionForm: React.FC<prop> = (prop: prop) => {
    const [nextIndex, setNextIndex] = useState<number>(1);

    const [addQuestionsZone, setAddQuestionsZone] = useState<ReactElement[]>([]);

    const [quiz, setQuiz] = useContext(QuizInfoContext);

    //useRef to delete
    let addQuestionsZoneRef = useRef<ReactElement[]>([]);
    addQuestionsZoneRef.current = addQuestionsZone;

    let questionsArrayRef = useRef<createQuestionParam[]>([]);
    questionsArrayRef.current = quiz.questions;

    
    const addQuestion = () => {
        
        const deleteThis = (index: number) => {
            //use '!=' because reactElement.key`s type is string
            setAddQuestionsZone(addQuestionsZoneRef.current.filter(element => element.key != index));
            setQuiz({ ...quiz, questions: questionsArrayRef.current.filter(q => q.indexId !== index) });
        }
        quiz.questions.push({ indexId: nextIndex, content: "", comment: "", choices: [] });
        setQuiz({ ...quiz, questions: quiz.questions });
        
        addQuestionsZone.push(
            <div key={nextIndex}>
                <CreateQuestionField index={nextIndex} />
                <div className="delete" onClick={() => deleteThis(nextIndex)}>削除</div>
            </div>
        )
        setAddQuestionsZone([...addQuestionsZone]);
        setNextIndex(nextIndex + 1);
    }

    return (
        <div className='createQuestionForm'>
            <CreateQuestionField index={0} />
            {addQuestionsZone}
            <div onClick={() => addQuestion()}>問題を追加</div>
        </div>
    )
}

export default CreateQuestionForm;