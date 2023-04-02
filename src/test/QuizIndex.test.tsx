import { fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
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
    mockedAxios.post.mockResolvedValueOnce(createTestData(1)).mockResolvedValueOnce(createTestData(2)).mockResolvedValueOnce(createTestData(3)).mockResolvedValue(createTestData(4));
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
    await new Promise(resolve => setTimeout(resolve, 1)) 

    await waitFor(() => expect( screen.getByText(/title1/)).toBeInTheDocument())

    for (let i = 0; i < 10; i++) {
        if (target !== null)
            fireEvent.click(target);
            await new Promise(resolve => setTimeout(resolve, 50)) 

    }
    await new Promise(resolve => setTimeout(resolve, 1)) 
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    
    console.log(mockedAxios.post.mock.calls.length);
    // await tar.then(a => console.log(a))
    // screen.debug();
})

test('search', async () => {
    render(<Router basename='/quizWeb/react'>
        <Switch>
            <Route exact path='/'>
                <QuizIndex />
            </Route>
        </Switch>
    </Router>)

// await new Promise(resolve => setTimeout(resolve, 1)) 

    let studyCategory = screen.getByText('その他');
     fireEvent.click(studyCategory);

    let viewOrder = screen.getByText('閲覧数順');
     fireEvent.click(viewOrder);

    let titleInput = document.querySelector('.input');

    if (titleInput !== null) {
          fireEvent.change(titleInput, { target: { value: 'テスト' } });
    }

    expect(await screen.findByText("title1", {}, { timeout: 40 })).toBeInTheDocument();
    let button = screen.getByText('絞り込み');
    fireEvent.click(button);

    let target = screen.getByText('next');
    expect(await screen.findByText("title101", {}, { timeout: 40 })).toBeInTheDocument();

})





function createTestData(num: number): any {
    let quiz: quiz[] = [];
    for (let i = (num - 1) * 100; i < num * 100; i++) {
        quiz.push({
            id: i,
            create_username: "user",
            title: "title" + i,
            category: "test",
            description: 'sample',
            thumbnail: "http://hogehoge.png",
        })
    }
    return { data: quiz };


}