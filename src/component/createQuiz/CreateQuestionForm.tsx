import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { useAddQuestion, useDeleteQuestion } from "../../hooks/useChangeQuizContext";
import CreateQuestionField from "./CreateQuestionField";
import css from "../../css/createQuizForm.module.scss"
import { ZodErrorContext } from "./CreateQuizForm";
import ErrorZone from "./ErrorZone";


type prop = {

}

const CreateQuestionForm: React.FC<prop> = (prop: prop) => {
    const [nextIndex, setNextIndex] = useState<number>(1);
    const [addQuestionsZone, setAddQuestionsZone] = useState<ReactElement[]>([]);

    const deleteQuestion = useDeleteQuestion();
    const addQuestionToContext = useAddQuestion();

    const zodError = useContext(ZodErrorContext);

    const [questionNumError, setQuestionNumError] = useState<string>('');

    //useRef to  define delete functon
    let addQuestionsZoneRef = useRef<ReactElement[]>([]);
    addQuestionsZoneRef.current = addQuestionsZone;

    useEffect(() => {
        addQuestion(0);
    }, [])

    useEffect(() => {
        setQuestionNumError('');

        if (zodError !== undefined) {
            const errorOccurQuiz = zodError.issues.filter(is => is.path.length === 1);

            for (let issue of errorOccurQuiz) {
                if (issue.path.includes('questions'))
                    setQuestionNumError(issue.message);
            }
        }

    }, [zodError])

    const addQuestion = (nextIndex: number) => {

        //define delete function
        const deleteThis = (index: number) => {
            addQuestionsZoneRef.current.forEach(e => console.log(e));
            //use '!=' because reactElement.key's type is string
            setAddQuestionsZone(addQuestionsZoneRef.current.filter(element => element.key != index));
            deleteQuestion(index);
        }

        addQuestionToContext({ indexId: nextIndex, content: "", comment: "", choices: [] });

        addQuestionsZone.push(
            <span key={nextIndex}>
                <div className={`${css["btn-danger"]} ${css["btn"]} ${css.deleteButton}`} onClick={() => deleteThis(nextIndex)}><i className={css["bi-x-lg"]}/> この問題を削除</div>
                <CreateQuestionField index={nextIndex} />
            </span>
    )
        setAddQuestionsZone([...addQuestionsZone]);
    }
    const disp = addQuestionsZone.map((e,index) => {return(
        <div key={e.key}>問題{index+1}
            {e}</div>)})
    return (
        <div className={css.createQuestionForm}>
            {disp}
            <div className={`${css.btn} ${css['btn-secondary']} ${css.addButton}`} onClick={() => {
                addQuestion(nextIndex);
                setNextIndex(nextIndex + 1);
            }}><i className={css['bi-journal-plus']}/> 問題を追加する</div>
            <ErrorZone errorMessage={questionNumError}/>
        </div>
    )
}

export default CreateQuestionForm;