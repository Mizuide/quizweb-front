import { fireEvent, getByText, render, screen } from '@testing-library/react';
import axios from 'axios';
import Question from '../component/Questions'
import { question } from '../type/quizDetail';

jest.mock('axios');

beforeEach(() => {
    jest.mock("axios");
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValueOnce({data:1}).mockResolvedValueOnce({data:2}).mockResolvedValueOnce({data:3});
}
)

test('render', async () => {
    render(<Question questions={createParam()} />)
    screen.debug();
    expect(screen.getByText('第1問')).toBeInTheDocument;
    // expect(screen.getByText('内容です')).toBeInTheDocument;
})

test('answer correct', async () => {
    render(<Question questions={createParam()} />)
    let target = screen.getByText('選択肢1');
    fireEvent.click(target);
    expect(await screen.findByAltText("読み込み中", {}, { timeout: 40 })).toBeInTheDocument();

    expect(await screen.findByAltText("正解", {}, { timeout: 40 })).toBeInTheDocument();
})

test('answer incorrect', async () => {
    render(<Question questions={createParam()} />)
    let target = screen.getByText('選択肢2');
    fireEvent.click(target);
    expect(await screen.findByAltText("読み込み中", {}, { timeout: 40 })).toBeInTheDocument();

    expect(await screen.findByAltText("不正解", {}, { timeout: 40 })).toBeInTheDocument();
    fireEvent.click(target);

})


test('display next', async () => {
    render(<Question questions={createParam()} />)
    let target = screen.getByText('選択肢2');
    fireEvent.click(target);
    await new Promise(resolve => setTimeout(resolve,40))
    target = screen.getByText('第1問')
    fireEvent.click(target);
    expect(screen.getByText('第2問')).toBeInTheDocument;
    screen.debug();
})


test('answer next', async () => {
    render(<Question questions={createParam()} />)
    let target = screen.getByText('選択肢1');
    fireEvent.click(target);
    await new Promise(resolve => setTimeout(resolve,40))
    fireEvent.click(target);
    expect(screen.getByText('第2問')).toBeInTheDocument;
    target = screen.getByText('選択肢2');
    fireEvent.click(target);
    await new Promise(resolve => setTimeout(resolve,40))
    expect(await screen.findByAltText("正解", {}, { timeout: 40 })).toBeInTheDocument();
})


const createParam = (): question[] => {
    let ret = [];
    for (let i = 0; i < 2; i++) {
        let q: question = {
            name: 'テスト',
            id: i,
            choices: [
                { selection_no: 1, content: '選択肢1', qusetionId: i },
                { selection_no: 2, content: '選択肢2', qusetionId: i },
                { selection_no: 3, content: '選択肢3', qusetionId: i },
                { selection_no: 4, content: '選択肢4', qusetionId: i },
            ],
            content: `${i+1}問目です`,
            comment: 'コメントです',
            num: i + 1
        }
        ret.push(q);
    }
    return ret;

}

