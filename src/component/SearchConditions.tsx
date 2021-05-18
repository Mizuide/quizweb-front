import { ReactElement, useState } from "react";
import Categories from './Categories';
import OrderList from './OrderList';
import WhereTitle from "./WhereTitle";

import * as categoryConst from '../const/category';
import * as orderConst from '../const/order';

import  searchConditions  from "../type/searchQuizesConditions";

interface SearchConditions extends ReactElement { }

type prop = {
    conditions: searchConditions
    setConditions: (title: searchConditions) => void
}

const SearchConditions: React.FC<prop> = (prop: prop) => {
    const [category, setCategory] = useState<categoryConst.categoryId>(categoryConst.categoryId.all);
    const [order, setOrder] = useState<orderConst.orderId>(orderConst.orderId.newOrder);
    const [wheretitle, setWhereTitle] = useState<string>('');

    return (
        <div className='SearchConditions'>
            
            <Categories setCategory={setCategory} />
            <OrderList setOrder={setOrder} />
            <WhereTitle setWhereTitle={setWhereTitle} />
            {/* //TODO:should add tags */}
            <button onClick={() =>
                prop.setConditions({ ...prop.conditions, category: category, order: order, title: wheretitle })}>
            絞り込み
            </button>
        </div>
    )
}


export default SearchConditions;