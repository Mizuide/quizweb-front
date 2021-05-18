import { ReactElement, useState } from "react";
import createQuizParam, { createQuestionParam } from "../../type/createQuizParam";
import quizDetail, { question, choice } from "../../type/quizDetail";
import Categories from "../Categories";
import Questions from "../Questions";
import * as categoryConst from '../../const/category'

const CreateQuizForm: React.FC<void> = () => {
    // let quizDetail:quizDetail={
    //   ...quiz,
    //   questions:questions
    // }
    const [category, setCategory] = useState<categoryConst.categoryId>(categoryConst.categoryId.all);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    
    let questions: createQuestionParam[] = [];

    let quiz: createQuizParam = {
        category: category,
        description: description,
        title: title,
        questions:questions
    }
    

    return (
        <div className='CreateQuizForm'>
            <Categories setCategory={setCategory} />
            <div className='title'>
                <input type='text' className='input' onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='description'>
                <input type='text' className='input' onChange={(e) => setDescription(e.target.value)} />
            </div>
            

        </div>
    )
}

export default CreateQuizForm;