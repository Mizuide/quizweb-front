import { fireEvent, getByText, render, screen } from '@testing-library/react';
import axios from 'axios';
import * as reactRouter from 'react-router-dom'
import resolve from 'resolve';
import QuizScreen from '../component/QuizScreen';
import quizDetailTestData from "./object/quizDetailTestData"


jest.mock('axios');
//何故か関数の再定義ができない(babelがコンパイル時に別名にしてしまうせい？)のでここでmock化させる
jest.mock('react-router-dom', () => ({
    useParams: jest.fn()
}));

beforeEach(() => {
    const QUIZ_DETAIL_URL: string = "/quizWeb/quizDetail";
    const ANSWER_URL: string = "/quizWeb/answer";

    const reactRouterMock = jest.spyOn(reactRouter, "useParams")
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.post.mockImplementation(
        (url: string) => {
            if (url === ANSWER_URL)
                return Promise.resolve({ data: 1 });
            else {
                return Promise.resolve({});
            }
        }
    )
    mockedAxios.get.mockResolvedValue({ data: quizDetailTestData });
    reactRouterMock.mockReturnValue({ id: "2" });
}
)


test('render', async () => {
    render(<QuizScreen />)

    await screen.findByText('test', {}, { timeout: 40 });
})

test('start', async () => {
    render(<QuizScreen />)

    await screen.findByText('test', {}, { timeout: 40 });

    const startBottun = screen.getByText(/スタート/);
    fireEvent.click(startBottun);

    await screen.findByText('第1問', {}, { timeout: 40 });

})

test('answer_correct', async () => {
    render(<QuizScreen />)

    await screen.findByText('test', {}, { timeout: 40 });

    const startBottun = screen.getByText(/スタート/);
    fireEvent.click(startBottun);

    await screen.findByText('第1問', {}, { timeout: 40 });

    const correctChoice = screen.getByText('選択肢1');
    fireEvent.click(correctChoice);

    expect(await screen.findByAltText("正解", {}, { timeout: 40 })).toBeInTheDocument();

    const header = screen.getByText('第1問');
    fireEvent.click(header);

    await screen.findByText('第2問', {}, { timeout: 40 });

})

test('answer_incorrect', async () => {
    render(<QuizScreen />)

    await screen.findByText('test', {}, { timeout: 40 });

    const startBottun = screen.getByText(/スタート/);
    fireEvent.click(startBottun);

    await screen.findByText('第1問', {}, { timeout: 40 });

    const incorrectChoice = screen.getByText('選択肢2');
    fireEvent.click(incorrectChoice);

    expect(await screen.findByAltText("不正解", {}, { timeout: 40 })).toBeInTheDocument();

    const header = screen.getByText('第1問');
    fireEvent.click(header);

    await screen.findByText('第2問', {}, { timeout: 40 });

})

test('answer_to_final', async () => {
    render(<QuizScreen />)

    await screen.findByText('test', {}, { timeout: 40 });

    const startBottun = screen.getByText(/スタート/);
    fireEvent.click(startBottun);

    for (let i = 0; i < 10; i++) {
        let correctChoice = screen.getByText('選択肢1');
        fireEvent.click(correctChoice);
        expect(await screen.findByAltText("正解", {}, { timeout: 40 })).toBeInTheDocument();
        const header = screen.getByText(`第${i + 1}問`);
        fireEvent.click(header);
    }

    expect(await screen.findByText(/10問中10問正解でした/, {}, { timeout: 40 })).toBeInTheDocument();

})