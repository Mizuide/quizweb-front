import { ReactElement, useContext, useRef, useState } from "react";
import { createChoiceParam } from "../../type/createQuizParam"
import CreateChoiceField from "./CreateChoiceField";
import { QuizInfoContext } from "./CreateQuizForm"


type prop = {
    quesitonIndex: number
}

const CreateChoiceForm: React.FC<prop> = (prop: prop) => {
    const [nextIndex, setNextIndex] = useState<number>(2);

    const [addChoicesZone, setAddChoicesZone] = useState<ReactElement[]>([]);

    const [correct, setCorrect] = useState<number>(0);

    const [quiz, setQuiz] = useContext(QuizInfoContext);

    const ownerQuestion = quiz.questions.find(q => q.indexId === prop.quesitonIndex);
    if (ownerQuestion === undefined) {
        throw new Error("this QuestionIndex is not find index:" + prop.quesitonIndex);
    }

    let addChoicesZoneRef = useRef<ReactElement[]>([]);
    addChoicesZoneRef.current = addChoicesZone;

    let choicesArrayRef = useRef<createChoiceParam[]>([]);
    choicesArrayRef.current = ownerQuestion.choices;

    const deleteThis = (index: number) => {
        //use '!=' because reactElement.key`s type is string
        setAddChoicesZone(addChoicesZoneRef.current.filter(element => element.key != index));
        setQuiz({
            ...quiz, questions: quiz.questions.map(q => {
                if (q.indexId === ownerQuestion.indexId) {
                    return { ...q, choices: choicesArrayRef.current.filter(choice => choice.indexId !== index) };
                } else {
                    return q;
                }
            })
        });
    }



    const addQuestion = (index: number) => {

        choicesArrayRef.current.push({ indexId: nextIndex, content: '', correctFlg: false });
        setQuiz({
            ...quiz, questions: quiz.questions.map(q => {
                if (q.indexId === ownerQuestion.indexId) {
                    return { ...q, choices: [...choicesArrayRef.current] };
                } else {
                    return q;
                }
            })
        })
        addChoicesZoneRef.current.push(
            <div key={nextIndex}>
                <CreateChoiceField questionIndex={prop.quesitonIndex} choiceIndex={nextIndex} />
            </div>
        );
        setAddChoicesZone([...addChoicesZoneRef.current])
        setNextIndex(nextIndex + 1);
    }


    return (
        <div className='createChoiceForm'>

        </div>
    )
}

export default CreateChoiceForm;