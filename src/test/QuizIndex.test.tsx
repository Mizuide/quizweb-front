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

beforeEach(() => {
    jest.mock("axios");
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValueOnce(createTestData(1)).mockResolvedValueOnce(createTestData(2)).mockResolvedValue(createTestData(3));
}
)

test('rendered', async () => {
    //テストケースに書かずに、beforeachに書くと動くけど、hould actのエラーが出て不快なのでtestcase内に書く
    render(<Router basename='/quizWeb/react'>
        <Switch>
            <Route exact path='/'>
                <QuizIndex />
            </Route>
        </Switch>
    </Router>)

    expect(await screen.findByText("title5", {}, { timeout: 4000 })).toBeInTheDocument();
})

test('click', async () => {
    render(<Router basename='/quizWeb/react'>
        <Switch>
            <Route exact path='/'>
                <QuizIndex />
            </Route>
        </Switch>
    </Router>)

    let target = screen.getByText('next');
    expect(await screen.findByText("title5", {}, { timeout: 4000 })).toBeInTheDocument();

    for (let i = 0; i < 10; i++) {
        if (target !== null)
            fireEvent.click(target);
    }
    expect(await screen.findByText("title100", {}, { timeout: 4000 })).toBeInTheDocument();
    const mockedAxios = axios as jest.Mocked<typeof axios>
    console.log(mockedAxios.get.mock.calls[1][1]);

})





function createTestData(num: number): any {
    let quiz: quiz[] = [];
    for (let i = (num - 1) * 100; i < num * 100; i++) {
        quiz.push({
            id: i,
            crete_username: "user",
            title: "title" + i,
            category: "test",
            description: 'sample',
            thumbnail: "http://hogehoge.png",
            tag: "test",
            questions: []
        })
    }
    return { data: quiz };


}