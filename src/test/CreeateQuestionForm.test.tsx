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

    render(<CreateQuestionForm questions={questions} setQuestions={setQuestions} />)

    let addButton = screen.getByText("問題を追加");
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    let deleteButton = screen.getAllByText("削除");
    fireEvent.click(deleteButton[1]);
    fireEvent.click(addButton);
    fireEvent.click(deleteButton[0]);

    screen.debug();

})