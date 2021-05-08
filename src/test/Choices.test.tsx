import Choices from '../component/Choices'
import { choice } from '../type/quizDetail'
import { fireEvent, getByText, render, screen } from '@testing-library/react';

test('render', async () => {
    let answer = undefined;
    let setAnswer = (number: number) => {
        answer = number;
    }

    render(<Choices choices={createChoices()} answer={answer} setAnswer={setAnswer} correctAnswer={undefined} />)
}
);

test('click', async () => {
    let answer = undefined;
    let setAnswer = (number: number) => {
        answer = number;
    }

    render(<Choices choices={createChoices()} answer={answer} setAnswer={setAnswer} correctAnswer={undefined} />)
    
    let target = screen.getByText('テスト0');
    
    fireEvent.click(target);

    expect(answer === 1).toBeTruthy();

}
);

test('clickTwice', async () => {
    let answer = undefined;
    let setAnswer = (number: number) => {
        answer = number;
    }

    render(<Choices choices={createChoices()} answer={answer} setAnswer={setAnswer} correctAnswer={undefined} />)
    
    let target = screen.getByText('テスト0');
    
    fireEvent.click(target);
    let target2 = screen.getByText('テスト1');
 
    expect(answer === 1).toBeTruthy();
}
);

test('after select correct answer',async () =>{
    let answer = undefined;
    let setAnswer = (number: number) => {
        answer = number;
    }


    let correctAnswer = 1;

    const {rerender} =render(<Choices choices={createChoices()} answer={answer} setAnswer={setAnswer} correctAnswer={correctAnswer} />)

    let target:HTMLElement = screen.getByText('テスト0');
    fireEvent.click(target);

    rerender(<Choices choices={createChoices()} answer={answer} setAnswer={setAnswer} correctAnswer={correctAnswer} />)

    let expectClassName = 'choice success';
    let actClassName=target.className;

    expect(expectClassName === actClassName).toBeTruthy();
    }
);

test('after select incorrect answer',() =>{
    let answer = undefined;
    let setAnswer = (number: number) => {
        answer = number;
    }

    let correctAnswer = 2;

    const {rerender} = render(<Choices choices={createChoices()} answer={answer} setAnswer={setAnswer} correctAnswer={correctAnswer} />)

    let target:HTMLElement = screen.getByText('テスト0');
    fireEvent.click(target);
    
    rerender(<Choices choices={createChoices()} answer={answer} setAnswer={setAnswer} correctAnswer={correctAnswer} />)
    
    let expectClickedClassName = 'choice faile';
    let actClickedClassName=target.className;

    expect(expectClickedClassName === expectClickedClassName).toBeTruthy();

    let correctAnswerTarget:string = screen.getByText('テスト1').className;
    let expectCorrectClassName = 'choice correctAnswer';

    expect(correctAnswerTarget === expectCorrectClassName).toBeTruthy();

}
);

const createChoices = (): choice[] => {
    let choices: choice[] = [];
    for (let i = 0; i < 4; i++) {
        choices.push({
            content: 'テスト' + i ,
            selection_no: i + 1,
            qusetionId: 1
        });
    }
    return choices;
}