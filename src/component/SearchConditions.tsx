import { ReactElement, useState } from "react";
import { Input } from "semantic-ui-react";
import * as categoryConst from '../const/category';
import * as orderConst from '../const/order';
import searchConditions from "../type/searchQuizesConditions";
import OrderList from './OrderList';



interface SearchConditions extends ReactElement { }

type prop = {
    conditions: searchConditions
    setConditions: (title: searchConditions) => void
}

const SearchConditions: React.FC<prop> = (prop: prop) => {
    const [category, setCategory] = useState<categoryConst.categoryId>(categoryConst.categoryId.all);
    const [order, setOrder] = useState<orderConst.orderId>(orderConst.orderId.newOrder);
    const [wheretitle, setWhereTitle] = useState<string>('');

    //コンポーネントをこれ一つに統合したい
    return (
        <div className='SearchConditions'>
            {/* <Categories setCategory={setCategory} /> */}
            <OrderList setOrder={setOrder} />
            {/* <WhereTitle setWhereTitle={setWhereTitle} onButtonClick = {() => prop.setConditions({ ...prop.conditions, category: category, order: order, title: wheretitle })} /> */}
            <Input size="mini" onChange={(e) => setWhereTitle(e.target.value)} action={{"size":"tiny","content":'検索',"icon":'search','onClick':() => prop.setConditions({...prop.conditions, category: category, order: order, title: wheretitle })}} />

            {/* //TODO:should add tags */}
        </div>
    )
}


export default SearchConditions;