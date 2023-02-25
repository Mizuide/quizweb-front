import { useContext, useEffect, useRef, useState } from "react";
import { Form, Label, Segment, TextArea } from "semantic-ui-react";
import css from "../../css/createQuizForm.module.scss";
import { useAddQuestion, useChangeQuestion, useDeleteQuestion, useFetchQuestion } from "../../hooks/useChangeQuizContext";
import choiceType from "../../type/choiceType";
import { createQuestionParam } from "../../type/createQuizParam";
import semantic_error from "../../type/semantic_error";
import CreateChoiceForm from "./CreateChoiceForm";
import { ZodErrorContext } from "./CreateQuizForm";

type questionFieldProp = {
    questionIndex: number;
    deleteThis: () => void;
    question?: createQuestionParam;
    error?: semantic_error;
}

const QuestionFields: React.FC<questionFieldProp[]> = (prop: questionFieldProp[]) => {

    const [values, setValues] = useState<{ questionIndex: number, content: string, comment: string, choiceType: choiceType }[]>([])

    useEffect(() => {
        setValues(prop.map(
            p => {
                const targetQuestion = values.find(v => v.questionIndex === p.questionIndex)
                if (targetQuestion !== undefined)
                    return { questionIndex: p.questionIndex, content: targetQuestion.content, comment: targetQuestion.comment, choiceType: targetQuestion.choiceType }
                return {
                    questionIndex: p.questionIndex, content: p.question?.content || '',
                    comment: p.question?.comment || '', choiceType: p.question?.choiceType || 'single'
                }
            }
        )
        );
    }, [prop])

    const changeQuestion = useChangeQuestion();

    function setValue({ questionIndex, content = undefined, comment = undefined, choiceType = undefined }:
        { questionIndex: number, content?: string, comment?: string, choiceType?: choiceType }) {
        const targetQuestion = values.find(p => p.questionIndex === questionIndex)

        if (targetQuestion === undefined)
            throw new Error('not found questionIndex:' + questionIndex);
        //  ||でやると空白での更新ができなくなるので三項演算子を使う
        changeQuestion(questionIndex, content !== undefined ? content : targetQuestion.content,
            comment !== undefined ? comment : targetQuestion.comment,
            choiceType !== undefined ? choiceType : targetQuestion.choiceType)
        setValues([...values.map(p => {
            if (p.questionIndex === targetQuestion.questionIndex)
                return {
                    questionIndex: questionIndex, content: content !== undefined ? content : targetQuestion.content,
                    comment: comment !== undefined ? comment : targetQuestion.comment,
                    choiceType: choiceType !== undefined ? choiceType : targetQuestion.choiceType
                };
            return p;
        }
        )])
    }

    const questionTypeOptions = [{ key: 'single', text: 'テキスト', value: 'single' },
    { key: 'image', text: '画像', value: 'image' }]
    const fields = prop.map((prop, index) => {
        return (
            <Segment key={prop.questionIndex}>
                <Form.Group unstackable >
                    <Label size={"large"} style={{ fontSize: '1.1rem' }} color='blue' ribbon>
                        問題{index + 1}
                    </Label>
                    <Form.Button size='medium' icon='trash' onClick={() => prop.deleteThis()} content='削除' />
                </Form.Group>
                <Form.Dropdown
                    label='問題形式'
                    fluid
                    selection
                    options={questionTypeOptions}
                    defaultValue={prop.question?.choiceType || questionTypeOptions[0].value}
                    onChange={(e: any, option: any) => setValue({ questionIndex: prop.questionIndex, choiceType: option.value })}
                />
                <Form.Field control={TextArea} placeholder="問題文を入力してください" label='問題文'
                    value={(values.find(v => v.questionIndex === prop.questionIndex))?.content}
                    onChange={(e: any) => setValue({ questionIndex: prop.questionIndex, content: e.target.value })}
                    error={prop.error} />
                <CreateChoiceForm questionIndex={prop.questionIndex} choiceType={(values.find(v => v.questionIndex === prop.questionIndex))?.choiceType as choiceType} choices={prop.question?.choices} />
                <Form.Input label='コメント' placeholder="回答後に表示されるコメントを入力してください"
                    value={(values.find(v => v.questionIndex === prop.questionIndex))?.comment}
                    onChange={(e: any) => setValue({ questionIndex: prop.questionIndex, comment: e.target.value })}
                />


            </Segment>
        )
    })
    return (
        <>
            {fields}
        </>
    )
}

type prop = {
    questions?: createQuestionParam[]
}

const CreateQuestionForm: React.FC<prop> = (prop: prop) => {
    const [nextIndex, setNextIndex] = useState<number>(0);

    const [questionFieldProps, setQuestionFieldProps] = useState<questionFieldProp[]>([]);
    //useRef to  define delete functon
    const questionFieldPropsRef = useRef<questionFieldProp[]>(questionFieldProps);
    questionFieldPropsRef.current = questionFieldProps;

    const deleteQuestion = useDeleteQuestion();
    const addQuestionToContext = useAddQuestion();

    const zodError = useContext(ZodErrorContext);
    const fetchQuestion = useFetchQuestion();
    useEffect(() => {
        type error = { questionIndex: number, message: string }
        let errors: error[] = [];
        if (zodError !== undefined) {
            const errorOccurQuestions = zodError.issues.filter(is => is.path.length >= 3 && is.path.length < 5);
            for (let issue of errorOccurQuestions) {
                let errorIndex = issue.path.filter(p => typeof p === 'number') as number[];
                let question = fetchQuestion(errorIndex[0]);
                if (question !== undefined) {
                    errors.push({ questionIndex: question.indexId, message: issue.message })
                }
            }
            setQuestionFieldProps(questionFieldProps.map((p, index) => {
                let e = errors.find(e => e.questionIndex === p.questionIndex)
                if (e) {
                    return { ...p, error: { content: e.message, pointing: 'below' } }
                }
                return { ...p, error: undefined };
            }
            ))
        }
    }, [zodError])


    useEffect(() => {
        addQuestion(nextIndex);
        setNextIndex(nextIndex + 1);
    }, [])


    useEffect(() => {
        restorePropQuestions(prop.questions);
    }, [prop.questions])


    const addQuestion = (nextIndex: number, question?: createQuestionParam) => {

        //define delete function
        const deleteThis = () => {
            //use '!=' because reactElement.key's type is string
            setQuestionFieldProps(questionFieldPropsRef.current.filter(p => p.questionIndex !== nextIndex));
            deleteQuestion(nextIndex);
            questionFieldPropsRef.current = questionFieldPropsRef.current.filter(p => p.questionIndex !== nextIndex);
        }

        addQuestionToContext({ indexId: nextIndex, content: "", comment: "", choices: [], choiceType: "single" });

        const newQuestionFieldProp: questionFieldProp = {
            questionIndex: nextIndex,
            question: question,
            deleteThis: deleteThis,
        }

        questionFieldPropsRef.current.push(newQuestionFieldProp);
        setQuestionFieldProps([...questionFieldPropsRef.current]);
    }
    const restorePropQuestions = (questions?: createQuestionParam[]) => {
        if (!questions) {
            return;
        }

        questionFieldPropsRef.current.forEach(q => q.deleteThis());
        questions.forEach((q, index) => {
            addQuestion(nextIndex + index, q);
        })
        setNextIndex(nextIndex + questions.length);
    }


    return (
        <>
            {QuestionFields(questionFieldProps)}
            <Form.Button fluid size="huge" color='grey' icon='plus' content={'問題を追加'} onClick={() => {
                addQuestion(nextIndex);
                setNextIndex(nextIndex + 1);
            }} />
            {/* <div className={`${css.btn} ${css['btn-secondary']} ${css.addButton}`} onClick={() => {
                addQuestion(nextIndex);
                setNextIndex(nextIndex + 1);
            }}><i className={css['bi-journal-plus']} /> 問題を追加する</div> */}
        </>
    )
}

export default CreateQuestionForm;