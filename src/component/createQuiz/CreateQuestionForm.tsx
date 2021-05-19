import { ReactElement, useRef, useState } from "react";
import { createQuestionParam } from "../../type/createQuizParam"
import CreateQuestionField from "./CreateQuestionField";

type prop = {
    questions: createQuestionParam[];
    setQuestions: (param: createQuestionParam[]) => void;
}

const CreateQuestionForm: React.FC<prop> = (prop: prop) => {
    const [index, setIndex] = useState<number>(1);

    const [addQuestionsZone, setAddQuestionsZone] = useState<ReactElement[]>([]);
    
    let addQuestionsZoneRef = useRef<ReactElement[]>([]);
    addQuestionsZoneRef.current = addQuestionsZone;

    const deleteThis = (index:number) => {
      setAddQuestionsZone(addQuestionsZoneRef.current.filter(element => element.key != index));
    }
    
    const addQuestion = (index:number) => {
        addQuestionsZone.push(
            <div key={index}>
                <CreateQuestionField questions={prop.questions} setQuestions={prop.setQuestions} />
                <div className="delete" onClick={() => deleteThis(index)}>削除</div>
            </div>
        )
        setAddQuestionsZone([...addQuestionsZone])
        setIndex(index + 1);
    }

    return (
        <div className='createQuestionForm'>
            <CreateQuestionField questions={prop.questions} setQuestions={prop.setQuestions} />
            {addQuestionsZone}
            <div onClick={() => addQuestion(index)}>問題を追加</div>
        </div>
    )
}

export default CreateQuestionForm;
