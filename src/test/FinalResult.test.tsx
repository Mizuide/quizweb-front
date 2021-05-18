import { fireEvent, getByText, render, screen } from '@testing-library/react';
import axios from 'axios'
import FinalResult from '../component/FinalResult';
import quiz from './object/quizDetailTestData';

jest.mock('axios');

beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValueOnce("");
}
)

test('render', async () => {
    render(<FinalResult quiz={quiz} numOfCorrect={5} />)
    expect(screen.getByText(/10問中5問正解でした/)).toBeInTheDocument();
})

test('axios', async () => {
    render(<FinalResult quiz={quiz} numOfCorrect={5} />)
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    expect(mockedAxios.post.mock.calls[0][1].correct === 5 ).toBeTruthy();
    expect(mockedAxios.post.mock.calls[0][1].quizId === 1 ).toBeTruthy();
})
