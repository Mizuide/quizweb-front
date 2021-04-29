import { fireEvent, getByText, render, screen } from '@testing-library/react';
import Categories from '../component/Categories';
import {categoryId} from '../type/category';
import { useState } from "react";



test('rendered', async () => {
    render(<Categories setCategory={() => {}}/>);
    screen.debug();
})

test('click', async () => {
    let category:typeof categoryId[keyof typeof categoryId] = categoryId.all;
    let onClick = (id:typeof categoryId[keyof typeof categoryId]) => category = id 

    render(<Categories setCategory={onClick}/>);
    let target = screen.getByText('学習');
    fireEvent.click(target);

    expect(category as typeof categoryId[keyof typeof categoryId] === categoryId.study).toBeTruthy();

})
