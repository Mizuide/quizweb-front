import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import createQuizParam, { createQuestionParam } from "../../type/createQuizParam"
import { QuizInfoContext } from "./CreateQuizForm"
import CreateQuestionField from "./CreateQuestionField";
import { useAddQuestion, useDeleteQuestion } from "../../hooks/useChangeQuizContext";


type prop = {

}

const CreateQuestionForm: React.FC<prop> = (prop: prop) => {
    const [nextIndex, setNextIndex] = useState<number>(1);
    const [addQuestionsZone, setAddQuestionsZone] = useState<ReactElement[]>([]);
    const [quiz, setQuiz] = useContext(QuizInfoContext);

    const deleteQuestion = useDeleteQuestion();
    const addQuestionToContext = useAddQuestion();

    //useRef to delete
    let addQuestionsZoneRef = useRef<ReactElement[]>([]);
    addQuestionsZoneRef.current = addQuestionsZone;

    let questionsArrayRef = useRef<createQuestionParam[]>([]);
    questionsArrayRef.current = quiz.questions;

    useEffect(() => {
        addQuestion(0);
    }, [])

    const addQuestion = (nextIndex: number) => {
        const deleteThis = (index: number) => {
            //use '!=' because reactElement.key`s type is string
            setAddQuestionsZone(addQuestionsZoneRef.current.filter(element => element.key != index));
            deleteQuestion(index);
        }

        addQuestionToContext({ indexId: nextIndex, content: "", comment: "", choices: [] });

        addQuestionsZone.push(
            <div key={nextIndex}>
                {nextIndex}
                <CreateQuestionField index={nextIndex} />
                <div className="delete" onClick={() => deleteThis(nextIndex)}>削除</div>
            </div>
        )
        setAddQuestionsZone([...addQuestionsZone]);

    }

    return (
        <div className='createQuestionForm'>
            {addQuestionsZone}
            <div onClick={() => {
                addQuestion(nextIndex);
                setNextIndex(nextIndex + 1);
            }}>問題を追加</div>
        </div>
    )
}

export default CreateQuestionForm;