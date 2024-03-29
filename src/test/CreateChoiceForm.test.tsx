import { fireEvent, render, screen } from '@testing-library/react';
import createQuizParam from '../type/createQuizParam';
import { QuizInfoContext } from '../component/createQuiz/CreateQuizForm';
import { SetStateAction } from 'react';
import { categoryId } from '../const/category';
import CreateChoiceForm from '../component/createQuiz/CreateChoiceForm';

let quiz: createQuizParam = {
    category: categoryId.all, description: 'test', questions: [
        {
            indexId: 0,
            content: "",
            comment: "",
            choices: []
        }

    ], title: 'test'
};
const setQuiz: SetStateAction<createQuizParam> = (param: createQuizParam) => quiz = param
test('render', async () => {
    const { rerender } = render(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateChoiceForm questionId={0} />
        </QuizInfoContext.Provider>
    )

    expect(screen.getAllByPlaceholderText(/選択肢を入力してください/).length === 2).toBeTruthy();
    expect(quiz.questions[0].choices[0].indexId === 0).toBeTruthy();
    expect(quiz.questions[0].choices[1].indexId === 1).toBeTruthy();

})
test('add choices', async () => {
    const { rerender } = render(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateChoiceForm questionId={0} />
        </QuizInfoContext.Provider>
    )

    const addChoiceBottun = screen.getByText(/選択肢を追加/);
    fireEvent.click(addChoiceBottun);
    expect(screen.getAllByPlaceholderText(/選択肢を入力してください/).length === 3).toBeTruthy();
    expect(quiz.questions[0].choices[0].indexId === 0).toBeTruthy();
    expect(quiz.questions[0].choices[1].indexId === 1).toBeTruthy();
    expect(quiz.questions[0].choices[2].indexId === 2).toBeTruthy();

})



test('delete choices', async () => {

    const { rerender } = render(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateChoiceForm questionId={0} />
        </QuizInfoContext.Provider>
    )

    const deleteChoiceBottuns = screen.getAllByText(/選択肢削除/);
    fireEvent.click(deleteChoiceBottuns[1]);
    expect(screen.getAllByPlaceholderText(/選択肢を入力してください/).length === 1).toBeTruthy();
    expect(quiz.questions[0].choices[0].indexId === 0).toBeTruthy();

})

test('add after delete choices', async () => {

    const { rerender } = render(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateChoiceForm questionId={0} />
        </QuizInfoContext.Provider>
    )
    const addChoiceButton = screen.getByText(/選択肢を追加/);
    fireEvent.click(addChoiceButton);

    const deleteChoiceBottuns = screen.getAllByText(/この選択肢を削除/);
    fireEvent.click(deleteChoiceBottuns[2]);
    rerender(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateChoiceForm questionId={0} />
        </QuizInfoContext.Provider>
    )
    fireEvent.click(addChoiceButton);

    expect(screen.getAllByPlaceholderText(/選択肢を入力してください/).length === 3).toBeTruthy();
    expect(quiz.questions[0].choices[0].indexId === 0).toBeTruthy();
    expect(quiz.questions[0].choices[1].indexId === 1).toBeTruthy();
    expect(quiz.questions[0].choices[2].indexId === 3).toBeTruthy();

    //and add
    fireEvent.click(addChoiceButton);
    expect(quiz.questions[0].choices[3].indexId === 4).toBeTruthy();

})

test('check correct', async () => {

    const { rerender } = render(
        <QuizInfoContext.Provider value={[quiz, setQuiz as React.Dispatch<React.SetStateAction<createQuizParam>>]} >
            <CreateChoiceForm questionId={0} />
        </QuizInfoContext.Provider>
    )
    const changeCorrectRadio = document.querySelectorAll('input[type="radio"]');
    
    // fireEvent.click(changeCorrectRadio.item(0));
    // expect(changeCorrectRadio[0].parentElement?.className === 'correct').toBeTruthy();
    // expect(changeCorrectRadio[1].parentElement?.className !== 'correct').toBeTruthy();
    console.log(quiz.questions[0]);

    // fireEvent.click(changeCorrectRadio.item(1));
    // expect(changeCorrectRadio[0].parentElement?.className !== 'correct').toBeTruthy();
    // expect(changeCorrectRadio[1].parentElement?.className === 'correct').toBeTruthy();
    

})


