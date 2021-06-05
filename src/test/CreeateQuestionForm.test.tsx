import { fireEvent, render, screen } from '@testing-library/react';
import CreateQuestionForm from '../component/createQuiz/CreateQuestionForm';
import createQuizParam from '../type/createQuizParam';
import { QuizInfoContext } from '../component/createQuiz/CreateQuizForm';
import { SetStateAction } from 'react';
import { categoryId } from '../const/category';

test('render', async () => {
    let quiz: createQuizParam = { category: categoryId.all, description: 'test', questions: [], title: 'test' };
    let setQuiz: SetStateAction<createQuizParam> = (param: createQuizParam) => quiz = param

    render(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateQuestionForm />
        </QuizInfoContext.Provider>
    )
    screen.debug();
    console.log(quiz);
    
})

// test('add', async () => {
//     let quiz: createQuizParam = { category: categoryId.all, description: 'test', questions: [], title: 'test' };
//     let setQuiz: SetStateAction<createQuizParam> = (param: createQuizParam) => quiz = param

//     render(
//         <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
//             <CreateQuestionForm />
//         </QuizInfoContext.Provider>
//     )
//     let addButton = screen.getByText("問題を追加");
//     fireEvent.click(addButton);
//     screen.debug();
//     console.log(quiz);
// })

// test('delete', async () => {
//     let quiz: createQuizParam = { category: categoryId.all, description: 'test', questions: [], title: 'test' };
//     let setQuiz: SetStateAction<createQuizParam> = (param: createQuizParam) => quiz = param

//     render(
//         <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
//             <CreateQuestionForm />
//         </QuizInfoContext.Provider>
//     )
//     let addButton = screen.getByText("問題を追加");
//     fireEvent.click(addButton);
//     screen.debug();
//     let deleteButton = screen.getAllByText("削除");
//     fireEvent.click(deleteButton[0]);
//     console.log(quiz);

// })


// test('delete2', async () => {
//     let quiz: createQuizParam = { category: categoryId.all, description: 'test', questions: [], title: 'test' };
//     let setQuiz: SetStateAction<createQuizParam> = (param: createQuizParam) => quiz = param

//     const { rerender } = render(
//         <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
//             <CreateQuestionForm />
//         </QuizInfoContext.Provider>
//     )
//     console.log(quiz);
//     rerender(<QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
//         <CreateQuestionForm />
//     </QuizInfoContext.Provider>)

//     let addButton = screen.getByText("問題を追加");
//     fireEvent.click(addButton);
//     console.log(quiz);
//     fireEvent.click(addButton);
//     fireEvent.click(addButton);
//     let deleteButton = screen.getAllByText("削除");
//     fireEvent.click(deleteButton[1]);
//     rerender(<QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
//         <CreateQuestionForm />
//     </QuizInfoContext.Provider>)
//     deleteButton = screen.getAllByText("削除");
//     fireEvent.click(deleteButton[2]);
//     rerender(<QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
//         <CreateQuestionForm />
//     </QuizInfoContext.Provider>)
//     let contentWrite = screen.getAllByPlaceholderText(/問題文を入力し/);

//     fireEvent.change(contentWrite[1], { target: { value: "テスト" } })
//     console.log(quiz);

//     screen.debug();

// })