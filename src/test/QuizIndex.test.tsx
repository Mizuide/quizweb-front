import { fireEvent, getByText, render, screen } from '@testing-library/react';
import QuizIndex from '../component/QuizIndex';
import quiz from '../type/quiz'

import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import { debug } from 'webpack';
jest.mock('axios');

test('rendered', async () => {
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

    expect(await screen.findByText("title5", {}, { timeout: 4000 })).toBeInTheDocument();
    // let target = document.querySelector<Element>('#a')
    // for (let i = 0; i < 10; i++) {
    //     if(target !== null)
    //       fireEvent.click(target);
    // }
    // expect(await screen.findByText("title5", {}, { timeout: 4000 })).toBeInTheDocument();
    screen.debug();


})

function createTestData(): any {
    let quiz: quiz[] = [];
    for (let i = 0; i < 100; i++) {
        quiz.push({
            id: i,
            crete_username: "user",
            title: "title"+i,
            category: "test",
            description: 'sample',
            thumbnail: "http://hogehoge.png",
            tag: "test",
            questions: []
        })
    }

    return { data: quiz };


}