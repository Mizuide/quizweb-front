import { useContext, useEffect, useRef, useState } from "react";
import * as api from "../../const/api";
import { GUEST_ID } from "../../const/const";
import css from "../../css/createQuizForm.module.scss";
import { useAddChoice, useChangeChoice, useChangeCorrectChoice, useDeleteChoice, useFetchChoice, useFetchQuestion } from "../../hooks/useChangeQuizContext";
import choiceFieldProp from "../../type/choiceFieldProp";
import choicetype from "../../type/choicetype";
import { createChoiceParam } from "../../type/createQuizParam";
import { ZodErrorContext } from "./CreateQuizForm";
import ImageChoiceFields from "./ImageChoiceField";
import SingleChoiceFields from "./SingleChoiceField";

type prop = {
    quizId: number
    questionId: number
    choicetype: choicetype
    choices?: createChoiceParam[]
}

const CreateChoiceForm: React.FC<prop> = (prop: prop) => {
    const [choiceFieldProps, setChoiceFieldProps] = useState<choiceFieldProp[]>([]);

    const addChoiceToContext = useAddChoice(prop.questionId);
    const deleteChoise = useDeleteChoice(prop.questionId);

    const changeCorrect = useChangeCorrectChoice(prop.questionId);
    const changeChoice = useChangeChoice(prop.questionId);


    const choiceFieldPropsRef = useRef<choiceFieldProp[]>(choiceFieldProps);
    choiceFieldPropsRef.current = choiceFieldProps;

    useEffect(() => {
        addChoice();
        addChoice();
    }, [])

    useEffect(() => {
        restorePropChoices(prop.choices);
    }, [prop.choices])

    const fetchQuestion = useFetchQuestion();
    const fetchChoice = useFetchChoice();
    const [zodError, setZodError] = useContext(ZodErrorContext);

    useEffect(() => {
        type error = { choiceId: number, message: string }
        let errors: error[] = [];
        if (zodError !== undefined) {
            const errorOccurQuestions = zodError.issues.filter(is => is.path.length >= 5);
            for (let issue of errorOccurQuestions) {
                let errorIndex = issue.path.filter(p => typeof p === 'number') as number[];
                let question = fetchQuestion(errorIndex[0]);
                if (question !== undefined && question.id === prop.questionId) {
                    let choice = fetchChoice(errorIndex[0], errorIndex[1]);
                    errors.push({ choiceId: choice.id, message: issue.message })
                }
            }
            setChoiceFieldProps(choiceFieldProps.map(p => {
                let e = errors.find(e => e.choiceId === p.choiceId)
                if (e) {
                    return { ...p, contentError: { content: e.message, pointing: 'left' } }
                }
                return { ...p, contentError: undefined };
            }
            ));
            setZodError(undefined);

        }
    }, [zodError])

    const addChoice = async (choice?: createChoiceParam) => {
        if (choiceFieldPropsRef.current.length === 4)
            return

        let choiceId = choice?.id as number;
        let createUserId = choice?.createUserId as number;

        if (choiceId === undefined && createUserId === undefined) {
            const res = await api.newChoice({ quizId: prop.quizId, questionId: prop.questionId, selectionNo: choiceFieldPropsRef.current.length, correctFlg: choiceFieldPropsRef.current.length !== 0 });
            choiceId = res.data.choiceId;
            createUserId = res.data.createUserId;
        }

        const saveEdit = (property: string, value: any) => {
            if (createUserId !== GUEST_ID) {
                let param = {
                    [property]: value
                }
                api.editChoice({ choice: { ...param, id: choiceId } });
            }
        }

        const deleteThis = () => {
            deleteChoise(choiceId);
            if (createUserId !== GUEST_ID) {
                api.deleteChoice({ id: choiceId })
            }
            setChoiceFieldProps([...choiceFieldPropsRef.current.filter(p => p.choiceId !== choiceId)]);
            choiceFieldPropsRef.current = choiceFieldPropsRef.current.filter(p => p.choiceId !== choiceId);
        }

        const chooseCorrect = () => {
            changeCorrect(choiceId);
            choiceFieldPropsRef.current.map(p => {
                if (p.choiceId === choiceId)
                    saveEdit('correct', true)
                saveEdit('correct', false)
            });
            setChoiceFieldProps([...choiceFieldPropsRef.current.map(p => {
                if (p.choiceId === choiceId)
                    return { ...p, correct: true }
                return { ...p, correct: false }
            })]);

        }

        const newChoiceProp = {
            choiceId: choiceId,
            createUserId: createUserId,
            deleteThis: deleteThis,
            chooseCorrect: chooseCorrect,
            correct: choice?.correctFlg !== undefined ? choice.correctFlg : choiceFieldPropsRef.current.length === 0,
            index: choiceFieldProps.length,
            changeChoice: changeChoice,
            content: choice?.content || ''
        }

        choiceFieldPropsRef.current.push(newChoiceProp);
        setChoiceFieldProps([...choiceFieldPropsRef.current]);
        addChoiceToContext({
            id: choiceId,
            content: choice?.content || '',
            correctFlg: choice?.correctFlg !== undefined ? choice.correctFlg : choiceFieldPropsRef.current.length === 0,
            createUserId: createUserId
        });

    }
    const restorePropChoices = (choices?: createChoiceParam[]) => {
        if (!choices) {
            return;
        }
        choiceFieldPropsRef.current.forEach(c => c.deleteThis());
        choices.forEach(c => addChoice(c));
    }

    // if の中にコンポーネント入れると "Rendered more hooks than during the previous render." になる
    const singleChoiceField = SingleChoiceFields(choiceFieldProps);
    const imageChoiceField = ImageChoiceFields(choiceFieldProps);

    const choiceFieldRef = useRef<any>();
    if (prop.choicetype === 'single') {
        choiceFieldRef.current = singleChoiceField;
    } else if (prop.choicetype === 'image') {
        choiceFieldRef.current = imageChoiceField;
    }

    return (
        <div key={prop.questionId}>
            {choiceFieldRef.current}
            <div className={`${css["btn"]} ${css["btn-secondary"]} ${css.addButton}`} onClick={() => {
                addChoice();
            }}><i className={css["bi-plus-lg"]}></i> 選択肢を追加</div>
        </div>
    )

}



export default CreateChoiceForm;