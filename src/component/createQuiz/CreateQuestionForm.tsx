import { ReactElement, useRef, useState } from "react";
import createQuizParam, { createQuestionParam } from "../../type/createQuizParam"
import CreateQuestionField from "./CreateQuestionField";

type prop = {
    questions: createQuestionParam[];
    setQuestions: (param: createQuestionParam[]) => void;
}

const CreateQuestionForm: React.FC<prop> = (prop: prop) => {
    const [index, setIndex] = useState<number>(1);

    const [addQuestionsZone, setAddQuestionsZone] = useState<ReactElement[]>([]);

    //useRef to de
    let addQuestionsZoneRef = useRef<ReactElement[]>([]);
    addQuestionsZoneRef.current = addQuestionsZone;

    let questionsArrayRef = useRef<createQuestionParam[]>([]);
    questionsArrayRef.current = prop.questions;

    const deleteThis = (index: number) => {
        //use '!=' because reactElement.key`s type is string
        setAddQuestionsZone(addQuestionsZoneRef.current.filter(element => element.key != index));
        prop.setQuestions(questionsArrayRef.current.filter(q => q.indexId !== index));
        // prop.setQuestions(questionsArrayRef.current.filter(q => q.indexId !== index));

    }

    const addQuestion = (index: number) => {
        addQuestionsZone.push(
            <div key={index}>
                <CreateQuestionField index={index} questions={prop.questions} setQuestions={prop.setQuestions} />
                <div className="delete" onClick={() => deleteThis(index)}>削除</div>
            </div>
        )
        // questionsArrayRef.current.push({ indexId: index, content: "", comment: "", choices: [] });
        prop.questions.push({ indexId: index, content: "", comment: "", choices: [] });
        // prop.setQuestions([...prop.questions]);

        setAddQuestionsZone([...addQuestionsZone]);
        setIndex(index + 1);
    }

    return (
        <div className='createQuestionForm'>
            <CreateQuestionField index={0} questions={prop.questions} setQuestions={prop.setQuestions} />
            {addQuestionsZone}
            <div onClick={() => addQuestion(index)}>問題を追加</div>
        </div>
    )
}

export default CreateQuestionForm;
