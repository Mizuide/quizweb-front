import { fireEvent, getByText, render, screen } from '@testing-library/react';
import Result from '../component/Result';

test('render_correct', async () => {
    
    render(<Result answerStatus={'correct'} comment={'正解！'}/>)
    screen.debug();
})

test('render_incorrect', async () => {
    
    render(<Result answerStatus={'incorrect'} comment={'不正解！'}/>)
    screen.debug();
})
test('render_waiting', async () => {
    
    render(<Result answerStatus={'waiting'} comment={'表示されないこと'}/>)
    screen.debug();
})