import { fireEvent, getByText, render, screen } from '@testing-library/react';
import Categories from '../component/Categories';
import * as  categoryConst from '../const/category';



test('rendered', async () => {
    render(<Categories setCategory={() => { }} />);
    for (let category of categoryConst.categoryList) {
        expect(screen.getByText(category.name)).toBeInTheDocument();
    }
})

test('click', async () => {
    let category: categoryConst.categoryId = categoryConst.categoryId.all;
    let onClick = (id: categoryConst.categoryId) => category = id

    render(<Categories setCategory={onClick} />);
    let target = screen.getByText('学習');
    fireEvent.click(target);

    expect(category as categoryConst.categoryId === categoryConst.categoryId.study).toBeTruthy();

})
