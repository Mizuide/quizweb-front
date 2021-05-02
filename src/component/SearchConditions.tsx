import { ReactElement, useState } from "react";
import Categories from './Categories';
import OrderList from './OrderList';
import c from './WhereTitle'

import * as categoryConst from '../const/category';
import * as orderConst from '../const/order';

import WhereTitle from "./WhereTitle";

interface SearchConditions extends ReactElement { }

type prop = {}

const SearchConditions: React.FC = () => {
    const [category, setCategory] = useState<categoryConst.categoryId>(categoryConst.categoryId.all);
    const [order, setOrder] = useState<orderConst.orderId>(orderConst.orderId.new);
    const [wheretitle,setWhereTitle] = useState<string>('');

    return (
        <div className='SearchConditions'>
            <Categories setCategory={(categoryId) => setCategory(categoryId)} />
            <OrderList setOrder={(orderId) => setOrder(orderId)} />
            <WhereTitle setWhereTitle={(title) => setWhereTitle(title)} />
            <button onClick={} />
        </div>
    )
}


export default SearchConditions;