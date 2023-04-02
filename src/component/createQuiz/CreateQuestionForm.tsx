import { useContext, useEffect, useRef, useState } from "react";
import { Form, Label, Segment, TextArea } from "semantic-ui-react";
import * as api_t from "../../const/api";
import { GUEST_ID } from "../../const/const";
import { useAddQuestion, useChangeQuestion, useDeleteQuestion, useFetchQuestion } from "../../hooks/useChangeQuizContext";
import choicetype from "../../type/choicetype";
import { createQuestionParam } from "../../type/createQuizParam";
import semantic_error from "../../type/semantic_error";
import CreateChoiceForm from "./CreateChoiceForm";
import { ZodErrorContext } from "./CreateQuizForm";

type questionFieldProp = {
    quizId: number;
    question: createQuestionParam;
    deleteThis: () => void;
    error?: semantic_error;
}

const QuestionFields: React.FC<questionFieldProp[]> = (prop: questionFieldProp[]) => {

    const [values, setValues] = useState<{ id: number, content: string, comment: string, choicetype: choicetype }[]>([])
    useEffect(() => {
        setValues(prop.map(
            p => {
                const targetQuestion = values.find(v => v.id === p.question.id)
                if (targetQuestion !== undefined)
                    return { id: p.question.id, content: targetQuestion.content, comment: targetQuestion.comment, choicetype: targetQuestion.choicetype }
                return {
                    id: p.question.id, content: p.question?.content || '',
                    comment: p.question?.comment || '', choicetype: p.question?.choicetype || 'single'
                }
            }
        )
        );
    }, [prop])

    const changeQuestion = useChangeQuestion();

    function setValue({ id: id, content = undefined, comment = undefined, choicetype = undefined }:
        { id: number, content?: string, comment?: string, choicetype?: choicetype }) {
        const targetQuestion = values.find(p => p.id === id)

        if (targetQuestion === undefined)
            throw new Error('not found questionIndex:' + id);
        //  ||でやると空白での更新ができなくなるので三項演算子を使う
        changeQuestion(id, content !== undefined ? content : targetQuestion.content,
            comment !== undefined ? comment : targetQuestion.comment,
            choicetype !== undefined ? choicetype : targetQuestion.choicetype)
        setValues([...values.map(p => {
            if (p.id === targetQuestion.id)
                return {
                    id: id, content: content !== undefined ? content : targetQuestion.content,
                    comment: comment !== undefined ? comment : targetQuestion.comment,
                    choicetype: choicetype !== undefined ? choicetype : targetQuestion.choicetype
                };
            return p;
        }
        )])
    }

    const questionTypeOptions = [{ key: 'single', text: 'テキスト', value: 'single' },
    { key: 'image', text: '画像', value: 'image' }]
    const fields = prop.map((prop, index) => {

        const saveEdit = (property: string, value: any) => {
            if (prop.question.createUserId !== GUEST_ID) {
                let param = {
                    [property]: value
                }
                api_t.editQuestion({ question: { ...param, id: prop.question.id } });
            }
        }
        return (
            <Segment key={prop.question.id}>
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
                    defaultValue={prop.question?.choicetype || questionTypeOptions[0].value}
                    onChange={(e: any, option: any) => setValue({ id: prop.question.id, choicetype: option.value })}
                />
                <Form.Field control={TextArea} placeholder="問題文を入力してください" label='問題文'
                    value={(values.find(v => v.id === prop.question.id))?.content}
                    onChange={(e: any) => {
                        setValue({ id: prop.question.id, content: e.target.value });
                        saveEdit('content', e.target.value);
                    }}
                    error={prop.error} />
                <CreateChoiceForm quizId={prop.quizId} questionId={prop.question.id} choicetype={(values.find(v => v.id === prop.question.id))?.choicetype as choicetype} choices={prop.question?.choices} />
                <Form.Input label='コメント' placeholder="回答後に表示されるコメントを入力してください(任意)"
                    value={(values.find(v => v.id === prop.question.id))?.comment}
                    onChange={(e: any) => {
                        setValue({ id: prop.question.id, comment: e.target.value });
                        saveEdit('comment', e.target.value);
                    }}
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
    quizId: number,
    questions?: createQuestionParam[]
}

const CreateQuestionForm: React.FC<prop> = (prop: prop) => {
    const [questionFieldProps, setQuestionFieldProps] = useState<questionFieldProp[]>([]);
    //useRef to define delete functon
    const questionFieldPropsRef = useRef<questionFieldProp[]>(questionFieldProps);
    questionFieldPropsRef.current = questionFieldProps;

    const deleteQuestion = useDeleteQuestion();
    const addQuestionToContext = useAddQuestion();
    const fetchQuestion = useFetchQuestion();

    const [zodError, setZodError] = useContext(ZodErrorContext);
    useEffect(() => {
        type error = { questionId: number, message: string }
        let errors: error[] = [];
        if (zodError !== undefined) {
            const errorOccurQuestions = zodError.issues.filter(is => is.path.length >= 3 && is.path.length < 5);
            for (let issue of errorOccurQuestions) {
                let errorIndex = issue.path.filter(p => typeof p === 'number') as number[];
                let question = fetchQuestion(errorIndex[0]);
                if (question !== undefined) {
                    errors.push({ questionId: question.id, message: issue.message })
                }
            }
            setQuestionFieldProps(questionFieldProps.map((p, index) => {
                let e = errors.find(e => e.questionId === p.question.id)
                if (e) {
                    return { ...p, error: { content: e.message, pointing: 'below' } }
                }
                return { ...p, error: undefined };
            }
            ));
            setZodError(undefined);
        }
    }, [zodError])


    useEffect(() => {
        addQuestion();
    }, [])


    useEffect(() => {
        restorePropQuestions(prop.questions);
    }, [prop.questions])


    const addQuestion = async (question?: createQuestionParam) => {
        let questionId = question?.id;
        let createUserId = question?.createUserId;
        if (questionId === undefined && createUserId === undefined) {
            const res = await api_t.newQuestion({ quizId: prop.quizId, num: questionFieldPropsRef.current.length, choicetype: choicetype.single });
            questionId = res.data.questionId;
            createUserId = res.data.createUserId;
        }
        if (question === undefined) {
            question = { id: questionId as number, quizId: prop.quizId, content: "", comment: "", choices: [], choicetype: choicetype.single, createUserId: createUserId as number };
        }
        addQuestionToContext(question);
        //define delete function
        const deleteThis = () => {
            //use '!=' because reactElement.key's type is string
            setQuestionFieldProps(questionFieldPropsRef.current.filter(p => p.question.id !== questionId));
            deleteQuestion(questionId as number);
            questionFieldPropsRef.current = questionFieldPropsRef.current.filter(p => p.question.id !== questionId);

        }

        const newQuestionFieldProp: questionFieldProp = {
            quizId: prop.quizId,
            question: question,
            deleteThis: deleteThis,
        }

        questionFieldPropsRef.current.push(newQuestionFieldProp);
        setQuestionFieldProps([...questionFieldPropsRef.current])

    }

    const restorePropQuestions = (questions?: createQuestionParam[]) => {
        if (!questions || questions.length === 0) {
            return;
        }

        questionFieldPropsRef.current.forEach(q => q.deleteThis());
        questions.forEach((q, index) => {
            addQuestion(q);
        })
    }

    return (
        <>
            {QuestionFields(questionFieldProps)}
            <Form.Button fluid size="huge" color='grey' icon='plus' content={'問題を追加'} onClick={() => {
                addQuestion();
            }} />
        </>
    )
}


export default CreateQuestionForm;