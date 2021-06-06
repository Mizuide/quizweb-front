import React, { ReactElement, useContext, useState } from "react";
import createQuizParam, { createChoiceParam, createQuestionParam } from "../../type/createQuizParam";
import Categories from "../Categories";
import * as categoryConst from '../../const/category'
import CreateQuestionForm from "./CreateQuestionForm";
import history from 'history/createBrowserHistory';
import axios from "axios";

type quizInfonContext = [
    quiz: createQuizParam,
    setQuiz: React.Dispatch<React.SetStateAction<createQuizParam>>
]

//QuizInfo is managed by context
export const QuizInfoContext = React.createContext<quizInfonContext>({} as quizInfonContext);

const CREATE_QUIZ_URL ="/quizWeb/quiz/create";

const CreateQuizForm: React.FC = () => {

    const [category, setCategory] = useState<categoryConst.categoryId>(categoryConst.categoryId.all);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');



    const [quiz, setQuiz] = useState<createQuizParam>({
        category: category,
        description: description,
        title: title,
        questions: []
    })

const submit = () =>{
    axios.post(CREATE_QUIZ_URL,{createQuizParam:quiz}).then(res => history().push('/'));
}

    return (
        <div className='CreateQuizForm'>
            <QuizInfoContext.Provider value={[quiz, setQuiz]}>
                <Categories setCategory={setCategory} />
                <div className='title'>
                    <input type='text' className='input' placeholder='クイズのタイトルを入力してください' onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='description'>
                    <input type='text' className='input' onChange={(e) => setDescription(e.target.value)} />
                </div>
                <CreateQuestionForm />
            </QuizInfoContext.Provider>
            <button className="submit" onClick={e => {
                (e.target as HTMLButtonElement).disabled=true;
                submit();
                }}></button>
        </div>
    )
}

export default CreateQuizForm;