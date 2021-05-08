import { fireEvent, getByText, render, screen } from '@testing-library/react';
import Question from '../component/Questions'
import { question } from '../type/quizDetail';

test('click', async () => {
    render(<Question questions={createParam()} />)
    expect(screen.getByText('テスト0')).toBeInTheDocument;
screen.debug();

})

const createParam = (): question[] => {
    let ret = [];
    for (let i = 0; i < 10; i++) {
        let q: question = {
            name: 'テスト' + i,
            id: i,
            choices: [
                {selection_no:1 ,content:'選択肢1',qusetionId:i},
                {selection_no:2 ,content:'選択肢2',qusetionId:i},
                {selection_no:3 ,content:'選択肢3',qusetionId:i},
                {selection_no:4 ,content:'選択肢4',qusetionId:i},
            ],
            content: '内容です',
            comment:'コメントです',
            num: i + 1
        }
        ret.push(q);
    }
    return ret;

}

