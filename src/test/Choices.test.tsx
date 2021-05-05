import Choices from '../component/Choices'
import choice from '../type/choice'
import { fireEvent, getByText, render, screen } from '@testing-library/react';


test('render', async () => {
    render(<Choices choices={createChoiceArray()} setCorrect={() =>{console.log()}} />)
    screen.debug();
}
)

const createChoiceArray = (): choice[] => {
    let ret: choice[] = [];
    for (let i = 0; i < 4; i++) {
        ret.push({
            content: 'テスト' + i,
            correct_flg: false,
            selection_no: i
        });
    }

    ret[0].correct_flg = true;

    return ret;
}