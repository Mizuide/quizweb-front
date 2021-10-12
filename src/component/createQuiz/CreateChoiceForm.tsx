import { useContext, useEffect, useRef, useState } from "react";
import css from "../../css/createQuizForm.module.scss";
import { useAddChoice, useChangeChoice, useChangeCorrectChoice, useDeleteChoice, useFetchChoice, useFetchQuestion } from "../../hooks/useChangeQuizContext";
import choiceFiledProp from "../../type/choiceFieldProp";
import { ZodErrorContext } from "./CreateQuizForm";
import ImageChoiceFields from "./ImageChoiceField";
import SingleChoiceField from "./SingleChoiceField";
import choiceType from "../../type/choiceType"

type prop = {
    questionIndex: number
    choiceType: choiceType
}

const CreateChoiceForm: React.FC<prop> = (prop: prop) => {
    const [nextIndex, setNextIndex] = useState<number>(2);
    const [choiceFieldProps, setChoiceFieldProps] = useState<choiceFiledProp[]>([]);

    const addChoiceToContext = useAddChoice(prop.questionIndex);
    const deleteChoise = useDeleteChoice(prop.questionIndex);

    const changeCorrect = useChangeCorrectChoice(prop.questionIndex);
    const changeChoice = useChangeChoice(prop.questionIndex);


    const choiceFieldPropsRef = useRef<choiceFiledProp[]>(choiceFieldProps);
    choiceFieldPropsRef.current = choiceFieldProps;

    useEffect(() => {
        addChoice(0);
        addChoice(1);
    }, [])

    const zodError = useContext(ZodErrorContext);
    const fetchQuestion = useFetchQuestion();
    const fetchChoice = useFetchChoice();

    useEffect(() => {
        type error = { choiceIndex: number, message: string }
        let errors: error[] = [];
        if (zodError !== undefined) {
            const errorOccurQuestions = zodError.issues.filter(is => is.path.length >= 5);
            for (let issue of errorOccurQuestions) {
                let errorIndex = issue.path.filter(p => typeof p === 'number') as number[];
                let question = fetchQuestion(errorIndex[0]);
                if (question !== undefined && question.indexId === prop.questionIndex) {
                    let choice = fetchChoice(errorIndex[0], errorIndex[1]);
                    errors.push({ choiceIndex: choice.indexId, message: issue.message })
                }
            }
            setChoiceFieldProps(choiceFieldProps.map((p, index) => {
                let e = errors.find(e => e.choiceIndex === p.choiceIndex)
                if (e) {
                    return { ...p, contentError: { content: e.message, pointing: 'left' } }
                }
                return { ...p, contentError: undefined };
            }
            ))
        }
    }, [zodError])

    const addChoice = (nextIndex: number) => {
        if (choiceFieldPropsRef.current.length === 4)
            return

        const deleteThis = () => {
            deleteChoise(nextIndex);
            setChoiceFieldProps([...choiceFieldPropsRef.current.filter(p => p.choiceIndex !== nextIndex)]);
        }
        const chooseCorrect = () => {
            changeCorrect(nextIndex);
            setChoiceFieldProps([...choiceFieldPropsRef.current.map(p => {
                if (p.choiceIndex === nextIndex)
                    return { ...p, correct: true }
                return { ...p, correct: false }
            })]);
        }

        const newChoiceProp = {
            choiceIndex: nextIndex,
            deleteThis: deleteThis,
            chooseCorrect: chooseCorrect,
            correct: choiceFieldPropsRef.current.length === 0,
            index: choiceFieldProps.length,
            changeChoice: changeChoice
        }

        choiceFieldPropsRef.current.push(newChoiceProp);

        setChoiceFieldProps([...choiceFieldPropsRef.current]);
        addChoiceToContext({ indexId: nextIndex, content: '', correctFlg: false });

    }

    const singleChoiceField = SingleChoiceField(choiceFieldProps);
    const imageChoiceField = ImageChoiceFields(choiceFieldProps);
    const choiceFieldRef = useRef<any>();
    if (prop.choiceType === 'single') {
        choiceFieldRef.current = singleChoiceField;
    } else if (prop.choiceType === 'image') {
        choiceFieldRef.current = imageChoiceField;
    }

    return (
        <div key={prop.questionIndex}>
            {choiceFieldRef.current}
            <div className={`${css["btn"]} ${css["btn-secondary"]} ${css.addButton}`} onClick={() => {
                addChoice(nextIndex);
                setNextIndex(nextIndex + 1);
            }}><i className={css["bi-plus-lg"]}></i> 選択肢を追加</div>
        </div>
    )

}



export default CreateChoiceForm;