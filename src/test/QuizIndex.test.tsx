import { fireEvent, getByText, render, screen } from '@testing-library/react';
import QuizIndex from '../component/QuizIndex';
import quiz from '../type/quiz'

import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
jest.mock('axios');

test('', async () => {
    jest.mock("axios");
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.get.mockResolvedValue(createTestData());

    render(<Router basename='/quizWeb/react'>
        <Switch>
            <Route exact path='/'>
                <QuizIndex />
            </Route>
        </Switch>
    </Router>)

    expect(await screen.findByText("5", {}, { timeout: 4000 })).toBeInTheDocument();
    for(let i =0;i < 10;i++){
        fireEvent.click(screen.getByText('next page'));
    }
    expect(await screen.findByText("5", {}, { timeout: 4000 })).toBeInTheDocument();
    
   

})

function createTestData(): any {
    let quiz: quiz[] = [];
    for (let i = 0; i < 100; i++) {
        quiz.push({
            id: i,
            crete_username: "user",
            title: "title",
            category: "test",
            tag: "test",
            questions: []
        })
    }

    return { data: quiz };


}