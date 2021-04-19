import { render, screen,act } from '@testing-library/react';
import QuizIndex from '../component/QuizIndex';
import quiz from '../type/quiz'

import axios from 'axios';

jest.mock('axios');

test('', () => {
    jest.mock("axios");
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.get.mockResolvedValue(createTestData());
    act(
    render(<QuizIndex />)
    );
    screen.debug();
})

function createTestData(): string {
    let quiz: quiz[] = [];
    for (let i = 0; i < 200; i++) {
        quiz.push({
            id: i,
            crete_username: "user",
            title: "title",
            category: "test",
            tag: "test",
            questions: []
        })
    }
    return JSON.stringify(quiz);

}