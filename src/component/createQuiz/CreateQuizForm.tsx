import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ZodError } from "zod";
import * as categoryConst from '../../const/category';
import createQuizParamOld from "../../type/createQuizParam";
import CreateQuizParamValidation from "../../validate/CreateQuizParamValidatiom";
import Categories from "../Categories";
import CreateQuestionForm from "./CreateQuestionForm";
import css from '../../css/createQuizForm.module.scss'

type quizInfonContext = [
    quiz: createQuizParamOld,
    setQuiz: React.Dispatch<React.SetStateAction<createQuizParamOld>>
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

    const [quiz, setQuiz] = useState<createQuizParamOld>({
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
        <div className='CreateQuizForm'>
            <h1>クイズを作成する</h1>
            <QuizInfoContext.Provider value={[quiz, setQuiz]}>
                <ZodErrorContext.Provider value={zodError}>
                    <Categories setCategory={setCategory} />
                    <div className={css.createQuizInfo}>
                        <ul>
                            <li>タイトル</li>
                            <div className='title'>
                                <input type='text' className={css.oneLineInput} placeholder='クイズのタイトルをここに入力してください' onChange={(e) => setTitle(e.target.value)} />
                                <div className={css.error}>{titleError}</div>
                            </div>
                            <li>説明文</li>
                            <div className='description'>
                                <input type='text' className={css.contentInput} placeholder='クイズの説明文をここに入力してください' onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </ul>
                    </div>
                    <CreateQuestionForm />
                </ZodErrorContext.Provider>
            </QuizInfoContext.Provider>
            <button className="submit" onClick={e => {
                submit(e.target as HTMLButtonElement);
            }}>クイズ作成</button>
        </div>
    )
}

export default CreateQuizForm;