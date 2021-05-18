import { fireEvent, getByText, render, screen } from '@testing-library/react';
import QuizDescription from '../component/QuizDescription';
import quiz from './object/quizDetailTestData';



test('render', async () => {
    let status = "wait";
    let onClick = () =>{
        status = "start!";
    }
    render(<QuizDescription quizDetail={quiz} onClickStart={onClick}/>)
    expect(screen.getByText(/test/)).toBeInTheDocument();
})

test('click', async () => {
    let status = "wait";
    let onClick = () =>{
        status = "start!";
    }
    render(<QuizDescription quizDetail={quiz} onClickStart={onClick}/>)
    
    fireEvent.click(screen.getByText(/スタート/));
    
    expect(status === "start!").toBeTruthy();
})