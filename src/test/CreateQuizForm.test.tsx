import { fireEvent, getByText, render, screen } from '@testing-library/react';
import axios from 'axios';
import { History } from 'history';
import * as reactRouter from 'react-router'; 
import CreateQuizForm from '../component/createQuiz/CreateQuizForm'

jest.mock('axios');
jest.mock('react-router');

test('render', async () => {
    render(<CreateQuizForm/>);
    
    screen.debug();
})

test('test valid', async () => {
    render(<CreateQuizForm/>);
    const submitButton = screen.getByText(/クイズ作成/);
    const titleInput = screen.getByPlaceholderText(/クイズのタイトルをここに入力してください/);
    fireEvent.change(titleInput,'タイトルテスト');
    fireEvent.click(submitButton);

    expect(screen.getByText('クイズのタイトルが入力されていません')).toBeInTheDocument();
    expect(screen.getByText('問題文が入力されていません')).toBeInTheDocument();
    expect(screen.getAllByText('選択肢の内容が入力されていません')[0]).toBeInTheDocument();
    expect(screen.getAllByText('選択肢の内容が入力されていません')[1]).toBeInTheDocument();

})

test('test valid add case', async () => {
    render(<CreateQuizForm/>);

    const addButton = screen.getByText(/問題を追加/);
    fireEvent.click(addButton);

    const submitButton = screen.getByText(/クイズ作成/);
    fireEvent.click(submitButton);

    expect(screen.getAllByText('問題文が入力されていません').length === 2).toBeTruthy();
    

 
})

test('test validate quesion number', async () => {

    render(<CreateQuizForm/>);
    const deleteChoiceButtons = screen.getAllByText(/この問題を削除/);
    fireEvent.click(deleteChoiceButtons[0]);

    const submitButton = screen.getByText(/クイズ作成/);
    fireEvent.click(submitButton);

    expect(screen.getByText('問題は最低1つは必要です')).toBeInTheDocument();

})

test('test validate choice number', async () => {

    render(<CreateQuizForm/>);
    const deleteChoiceButtons = screen.getAllByText(/この選択肢を削除/);
    fireEvent.click(deleteChoiceButtons[0]);

    const submitButton = screen.getByText(/クイズ作成/);
    fireEvent.click(submitButton);

    expect(screen.getByText('選択肢は最低で2つ必要です')).toBeInTheDocument();

})

test('test pass', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue({ data: 1 });
    const mockerReactRouter = reactRouter as jest.Mocked<typeof reactRouter>;
    mockerReactRouter.useHistory.mockReturnValue({push:() => console.log('submit!!!')} as any);

    render(<CreateQuizForm/>);
    const submitButton = screen.getByText(/クイズ作成/);
    fireEvent.click(submitButton);

    expect(screen.getByText('クイズのタイトルが入力されていません')).toBeInTheDocument();
    expect(screen.getByText('問題文が入力されていません')).toBeInTheDocument();
    expect(screen.getAllByText('選択肢の内容が入力されていません')[0]).toBeInTheDocument();
    expect(screen.getAllByText('選択肢の内容が入力されていません')[1]).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText(/クイズのタイトルをここに入力してください/);
    fireEvent.change(titleInput,{target:{value:'タイトルテスト'}});
   
    const questionContentInput = screen.getByPlaceholderText(/問題文を入力してください/);
    fireEvent.change(questionContentInput,{target:{value:'問題文テスト'}});

    const choiceContentInputs = screen.getAllByPlaceholderText(/選択肢を入力してください/);
    fireEvent.change(choiceContentInputs[0],{target:{value:'選択肢テスト①'}});
    fireEvent.change(choiceContentInputs[1],{target:{value:'選択肢テスト②'}});
    
    fireEvent.click(submitButton);

    screen.debug();

})
