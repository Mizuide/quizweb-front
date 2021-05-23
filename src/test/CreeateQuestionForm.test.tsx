import { fireEvent, getByText, render, screen } from '@testing-library/react';
import CreateQuestionForm from '../component/createQuiz/CreateQuestionForm';
import { createQuestionParam } from '../type/createQuizParam';

test('render', async () => {
    let questions: createQuestionParam[] = [];
    let setQuestions = (param: createQuestionParam[]) => questions = param;

    render(<CreateQuestionForm questions={questions} setQuestions={setQuestions} />)
    screen.debug();
})

test('add', async () => {
    let questions: createQuestionParam[] = [];
    let setQuestions = (param: createQuestionParam[]) => questions = param;

    render(<CreateQuestionForm questions={questions} setQuestions={setQuestions} />)

    let addButton = screen.getByText("問題を追加");
    fireEvent.click(addButton);
    screen.debug();

})

test('delete', async () => {
    let questions: createQuestionParam[] = [];
    let setQuestions = (param: createQuestionParam[]) => questions = param;

    render(<CreateQuestionForm questions={questions} setQuestions={setQuestions} />)

    let addButton = screen.getByText("問題を追加");
    fireEvent.click(addButton);
    let deleteButton = screen.getByText("削除");
    fireEvent.click(deleteButton);
    screen.debug();

})


test('delete2', async () => {
    let questions: createQuestionParam[] = [];
    let setQuestions = (param: createQuestionParam[]) => questions = param;

    const {rerender} = render(<CreateQuestionForm questions={questions} setQuestions={setQuestions} />)

    let addButton = screen.getByText("問題を追加");
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    console.log(questions);

    let deleteButton = screen.getAllByText("削除");
    fireEvent.click(deleteButton[1]);
    rerender(<CreateQuestionForm questions={questions} setQuestions={setQuestions} />)    
    deleteButton = screen.getAllByText("削除");
    fireEvent.click(deleteButton[0]);
    rerender(<CreateQuestionForm questions={questions} setQuestions={setQuestions} />)    
    
    // let contentWrite = screen.getAllByPlaceholderText(/問題文を入力し/);
    // fireEvent.change(contentWrite[1],  {target:{value:"テスト"}})


    console.log(questions);
    
    screen.debug();

})