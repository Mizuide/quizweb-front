import { ReactElement, useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import * as orderConst from '../../const/order';
import searchConditions from "../../type/searchQuizesConditions";
import tag from "../../type/tag";
import OrderList from './OrderList';
import SearchFieldByTag from "./SearchFieldByTag";
import SearchFieldByTitle from "./SearchFieldByTitle";

interface SearchConditions extends ReactElement { }

type prop = {
    conditions: searchConditions
    setConditions: (searchConditions: searchConditions) => void
}

const SearchConditions: React.FC<prop> = (prop: prop) => {
    const [wheretitle, setWhereTitle] = useState<string>('');
    const [tags, setTags] = useState<tag[]>([]);

    const [searchMode, setSearchMode] = useState<'title' | 'tag'>('title');

    const onSelectOption = (e: any, { value }: any) => {
        setSearchMode(value);
    }

    const titleSearch = <SearchFieldByTitle width={14} setTitle={setWhereTitle} />

    const tagSearch = <SearchFieldByTag
        setTags={setTags}
        width={14}
    />

    const [searchField, setSearchField] = useState<JSX.Element>();

    useEffect(() => {
        if (searchMode === "title")
            setSearchField(titleSearch)
        if (searchMode === "tag")
            setSearchField(tagSearch)
    }, [searchMode])

    
    return (
        <Form>
            <Form.Group widths={16}>
                <Form.Dropdown　button fluid defaultValue={searchMode} options={[
                    { key: 1, text: '問題名で検索', value: 'title' },
                    { key: 2, text: 'タグで検索', value: 'tag' }
                ]} onChange={onSelectOption} width={3} />
                {searchField}
                <Form.Button size='medium' content='検索' icon='search' width={2}
                    onClick={() => prop.setConditions({ ...prop.conditions, order: orderConst.orderId.newOrder, title: wheretitle, tags: tags })} />
            </Form.Group>
            <OrderList setOrder={(order: orderConst.orderId) => prop.setConditions({ ...prop.conditions, order: order })} />
        </Form>
    )
}


export default SearchConditions;