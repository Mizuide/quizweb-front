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
    expect(screen.getByPlaceholderText("問題文を入力してください")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("回答後に表示されるコメントを入力してください")).toBeInTheDocument();
    screen.debug()
})

test('add', async () => {
    let quiz: createQuizParam = { category: categoryId.all, description: 'test', questions: [], title: 'test' };
    let setQuiz: SetStateAction<createQuizParam> = (param: createQuizParam) => quiz = param

    render(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateQuestionForm />
        </QuizInfoContext.Provider>
    )
    let addButton = screen.getByText("問題を追加");
    fireEvent.click(addButton);
    expect(screen.getAllByPlaceholderText("問題文を入力してください").length === 2).toBeTruthy;
    expect(quiz.questions.length === 2).toBeTruthy();

})

test('delete', async () => {
    let quiz: createQuizParam = { category: categoryId.all, description: 'test', questions: [], title: 'test' };
    let setQuiz: SetStateAction<createQuizParam> = (param: createQuizParam) => quiz = param

    const { rerender } = render(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateQuestionForm />
        </QuizInfoContext.Provider>
    )
    let addButton = screen.getByText("問題を追加");
    fireEvent.click(addButton);
    let deleteButton = screen.getAllByText("削除");
    fireEvent.click(deleteButton[0]);
    expect(screen.getAllByPlaceholderText("問題文を入力してください").length === 1).toBeTruthy;
    expect(quiz.questions.length === 1).toBeTruthy;
    //and add
    rerender(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateQuestionForm />
        </QuizInfoContext.Provider>
    )
    addButton = screen.getByText("問題を追加");
    fireEvent.click(addButton);
    expect(screen.getAllByPlaceholderText("問題文を入力してください").length === 2).toBeTruthy;
    expect(quiz.questions.length === 2).toBeTruthy();


})

test('changeValueContent', async () => {
    let quiz: createQuizParam = { category: categoryId.all, description: 'test', questions: [], title: 'test' };
    let setQuiz: SetStateAction<createQuizParam> = (param: createQuizParam) => quiz = param
    const { rerender } = render(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateQuestionForm />
        </QuizInfoContext.Provider>
    )
    let contentWrite = screen.getAllByPlaceholderText(/問題文を入力し/);
    fireEvent.change(contentWrite[0], { target: { value: "テスト" } })

    expect(quiz.questions[0].content === "テスト").toBeTruthy();

})

test('changeValueComment', async () => {
    let quiz: createQuizParam = { category: categoryId.all, description: 'test', questions: [], title: 'test' };
    let setQuiz: SetStateAction<createQuizParam> = (param: createQuizParam) => quiz = param
    const { rerender } = render(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateQuestionForm />
        </QuizInfoContext.Provider>
    )
    let contentWrite = screen.getAllByPlaceholderText(/コメントを入力し/);
    fireEvent.change(contentWrite[0], { target: { value: "テスト" } })

    expect(quiz.questions[0].comment === "テスト").toBeTruthy();

})

test('changeValueContent', async () => {
    let quiz: createQuizParam = { category: categoryId.all, description: 'test', questions: [], title: 'test' };
    let setQuiz: SetStateAction<createQuizParam> = (param: createQuizParam) => quiz = param
    const { rerender } = render(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateQuestionForm />
        </QuizInfoContext.Provider>
    )
    // let titleWrite = screen.getAllByPlaceholderText(/タイトルを入力し/);
    // fireEvent.change(titleWrite[0], { target: { value: "タイトルテスト" } })
    let contentWrite = screen.getAllByPlaceholderText(/問題文を入力し/);
    fireEvent.change(contentWrite[0], { target: { value: "テスト" } })
    console.log(quiz.questions[0].choices);
    rerender(<QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
        <CreateQuestionForm />
    </QuizInfoContext.Provider>
    )
    const addChoiceButton = document.querySelectorAll('input[type="radio"]');

    fireEvent.click(addChoiceButton.item(0));
    console.log(quiz.questions[0].choices);

})