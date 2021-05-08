import { fireEvent, getByText, render, screen } from '@testing-library/react';
import WhereTitle from '../component/WhereTitle';


test('rendere', async () => {
    render(<WhereTitle setWhereTitle={() => { }} />);
    let target = document.querySelector('.input');
    expect(target !== null).toBeTruthy();
})

test('change', async () => {
    let title: string = '';
    let onChange = (id: string) => title = id

    render(<WhereTitle setWhereTitle={onChange} />);
    let target = document.querySelector('.input');

    if (target !== null)
        fireEvent.change(target, {target:{value:'テスト'}});
        
    expect(title === 'テスト').toBeTruthy();

})
