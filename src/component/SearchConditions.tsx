import { ReactElement, useState } from "react";
import Categories from './Categories';
import OrderList from './OrderList';
import c from './WhereTitle'

import * as categoryConst from '../const/category';
import * as orderConst from '../const/order';

import WhereTitle from "./WhereTitle";
import fetchQuizParam from "../type/fetchQuizParam";

interface SearchConditions extends ReactElement { }

type prop = {setParam:React.Dispatch<React.SetStateAction<fetchQuizParam>>}

const SearchConditions: React.FC<prop> = (prop:prop) => {
    //TODO:useRedcerを使用する形に書き換える
    const [category, setCategory] = useState<categoryConst.categoryId>(categoryConst.categoryId.all);
    const [order, setOrder] = useState<orderConst.orderId>(orderConst.orderId.new);
    const [wheretitle,setWhereTitle] = useState<string>('');

    return (
        <div className='SearchConditions'>
            <Categories setCategory={(categoryId) => setCategory(categoryId)} />
            <OrderList setOrder={(orderId) => setOrder(orderId)} />
            <WhereTitle setWhereTitle={(title) => setWhereTitle(title)} />
            <button onClick={() => prop.setParam()} />
        </div>
    )
}


export default SearchConditions;