import React, { ReactElement, useContext, useState } from "react";
import createQuizParam, { createQuestionParam } from "../../type/createQuizParam";
import Categories from "../Categories";
import * as categoryConst from '../../const/category'
import CreateQuestionForm from "./CreateQuestionForm";

type quizInfonContext = [
    quiz: createQuizParam,
    setQuiz: React.Dispatch<React.SetStateAction<createQuizParam>>
]

//QuizInfo is managed  by context
export const QuizInfoContext = React.createContext<quizInfonContext>({} as quizInfonContext);


const CreateQuizForm: React.FC<void> = () => {

    const [category, setCategory] = useState<categoryConst.categoryId>(categoryConst.categoryId.all);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    let questions: createQuestionParam[] = [];


    const [quiz, setQuiz] = useState<createQuizParam>({
        category: category,
        description: description,
        title: title,
        questions: questions
    })


    return (
        <div className='CreateQuizForm'>
            <QuizInfoContext.Provider value={[quiz, setQuiz]}>
                <Categories setCategory={setCategory} />
                <div className='title'>
                    <input type='text' className='input' onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='description'>
                    <input type='text' className='input' onChange={(e) => setDescription(e.target.value)} />
                </div>
                <CreateQuestionForm />
            </QuizInfoContext.Provider>

        </div>
    )
}

export default CreateQuizForm;