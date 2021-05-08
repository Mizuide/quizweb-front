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
    mockedAxios.get.mockResolvedValueOnce(createTestData(1)).mockResolvedValueOnce(createTestData(2)).mockResolvedValueOnce(createTestData(3));
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
    // await waitFor(() => expect( screen.getByText(/title1/)).toBeInTheDocument())
    // let tar =  screen.findAllByText('title100',{},{timeout:4000});
    for (let i = 0; i < 10; i++) {
        if (target !== null)
        fireEvent.click(target);
    }
    await new Promise(resolve => setTimeout(resolve, 1)) 
    screen.debug();
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    
    // console.log(tar);
    // await tar.then(a => console.log(a))
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
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    console.log(mockedAxios.get.mock.calls[0][1]);
    console.log(mockedAxios.get.mock.calls[1][1]);
    
    let target = screen.getByText('next');
    expect(await screen.findByText("title101", {}, { timeout: 40 })).toBeInTheDocument();

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
            tag: "test"
        })
    }
    return { data: quiz };


}