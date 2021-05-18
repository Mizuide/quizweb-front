import { fireEvent, getByText, render, screen } from '@testing-library/react';
import SearchConditions from '../component/SearchConditions';
import * as categoryConst from '../const/category';
import * as orderConst from '../const/order';
import searchConditions from '../type/searchQuizesConditions';

test('render', async () => {
    let searchConditions: searchConditions = {
        category: categoryConst.categoryId.all,
        title: '',
        order: orderConst.orderId.newOrder
    }
    let setConditions = (value: React.SetStateAction<searchConditions>) => (searchConditions: searchConditions) => value

    render(<SearchConditions conditions={searchConditions} setConditions={setConditions} />);
    screen.debug();
})
test('changeCategory', async () => {
    let searchConditions: searchConditions = {
        category: categoryConst.categoryId.all,
        title: '',
        order: orderConst.orderId.newOrder
    }
    let setConditions = (value: searchConditions) => searchConditions = value
    render(<SearchConditions conditions={searchConditions} setConditions={setConditions} />);

    let studyCategory = screen.getByText('その他');
    fireEvent.click(studyCategory);

    let viewOrder = screen.getByText('閲覧数順');
    fireEvent.click(viewOrder);

    let titleInput = document.querySelector('.input');

    if (titleInput !== null)
        fireEvent.change(titleInput, { target: { value: 'テスト' } });


    let button = screen.getByText('絞り込み');
    fireEvent.click(button);

    let expectSearchConditions: searchConditions = {
        category: categoryConst.categoryId.other,
        title: 'テスト',
        order: orderConst.orderId.viewOrder
    }

    expect(expectSearchConditions).toEqual(searchConditions);





})
