import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ZodError } from "zod";
import * as categoryConst from '../../const/category';
import createQuizParam from "../../type/createQuizParam";
import CreateQuizParamValidation from "../../validate/CreateQuizParamValidatiom";
import Categories from "../Categories";
import ErrorZone from "./ErrorZone";
import CreateQuestionForm from "./CreateQuestionForm";
import css from "../../css/createQuizForm.module.scss";

type quizInfonContext = [
    quiz: createQuizParam,
    setQuiz: React.Dispatch<React.SetStateAction<createQuizParam>>
]

//QuizInfo is managed by context
export const QuizInfoContext = React.createContext<quizInfonContext>({} as quizInfonContext);

export const ZodErrorContext = React.createContext<ZodError | undefined>({} as ZodError);

const CREATE_QUIZ_URL = "/quizWeb/quiz/create";

const CreateQuizForm: React.FC = () => {

    const [category, setCategory] = useState<categoryConst.categoryId>(categoryConst.categoryId.all);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const history = useHistory();

    const [zodError, setZodError] = useState<ZodError>();

    const [titleError, setTitleError] = useState<string>('');

    const [quiz, setQuiz] = useState<createQuizParam>({
        category: category,
        description: description,
        title: title,
        questions: []
    })

    useEffect(() => {
        setQuiz({ ...quiz, title: title, description: description });
    }, [title, description])

    useEffect(() => {
        setTitleError('');
        if (zodError !== undefined) {
            for (let issue of zodError.issues) {
                if (issue.path.includes('title')) {
                    setTitleError(issue.message);
                }
            }
        }
    }, [zodError])


    const submit = (target: HTMLButtonElement) => {
        try {
            CreateQuizParamValidation.parse(quiz);
            target.disabled = true;
            setZodError(undefined);
            axios.post(CREATE_QUIZ_URL, { createQuizParam: quiz }).then(res => history.push('/'));
        } catch (e) {
            if (e instanceof ZodError) {
                setZodError(e);
            } else {
                throw e;
            }
        }
    }

    return (
        <div className={css.createQuizForm}>
            <h1>クイズを作成する</h1>
            <QuizInfoContext.Provider value={[quiz, setQuiz]}>
                <ZodErrorContext.Provider value={zodError}>
                    <Categories setCategory={setCategory} />
                    <div className={css.quizInfo}>
                        タイトル
                        <div className='title'>
                            <input type='text' className={css.oneLineInput} placeholder='クイズのタイトルをここに入力してください' onChange={(e) => setTitle(e.target.value)} />
                            <ErrorZone errorMessage={titleError} />
                        </div>
                        説明文
                        <div className='description'>
                            <input type='text' className={css.contentInput} placeholder='クイズの説明文をここに入力してください' onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <CreateQuestionForm />
                    </div>
                </ZodErrorContext.Provider>
            </QuizInfoContext.Provider>
            <button className={`${css.btn} ${css['btn-success']} ${css.submitButton}`} onClick={e => {
                submit(e.target as HTMLButtonElement);
            }}><i className={css['bi-pencil']}/> クイズを作成する
            </button>
        </div>
    )
}

export default CreateQuizForm;