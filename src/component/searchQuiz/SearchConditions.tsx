import { ReactElement, useEffect, useState } from "react";
import { Dropdown, DropdownItemProps, Form } from "semantic-ui-react";
import * as orderConst from '../../const/order';
import searchConditions from "../../type/searchQuizesConditions";
import tag from "../../type/tag";
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

    const dropDowm = <Dropdown
        simple
        defaultValue={searchMode}
        options={[
            { key: 1, text: 'タイトルで検索', value: 'title' },
            { key: 2, text: 'タグで検索', value: 'tag' }
        ]} onChange={onSelectOption}
    />
    const titleSearch = <SearchFieldByTitle setTitle={setWhereTitle} dropDown={dropDowm} />

    const tagSearch = <SearchFieldByTag setTags={setTags} dropDowm={dropDowm} />

    const [searchField, setSearchField] = useState<JSX.Element>();

    useEffect(() => {
        if (searchMode === "title")
            setSearchField(titleSearch)
        if (searchMode === "tag")
            setSearchField(tagSearch)
    }, [searchMode])

    useEffect(() => prop.setConditions({
        ...prop.conditions, order: orderConst.orderId.newOrder,
        title: wheretitle, tags: tags
        }), [wheretitle, tags])
    let orderList: DropdownItemProps[] = [];
    let count = 1;
    for (let order of orderConst.orderList) {
        orderList.push({ key: count, text: order.name, value: order.id });
        count++;
    }
    return (
        <Form
            //  onSubmit={() => prop.setConditions({
            //     ...prop.conditions, order: orderConst.orderId.newOrder,
            //     title: wheretitle, tags: tags
            // })}
            // HACK: Card.Group > stckableを指定した Indexのせいで LinkToQuizがモバイル表示時に重なってしまうため、merginを追加
            style={{ 'margin-bottom': '0.875em' }}
        >
            {searchField}
            <span>表示順：
                <Dropdown defaultValue={prop.conditions.order} options={orderList}
                    onChange={(e: any, { value }: any) => {
                        prop.setConditions({ ...prop.conditions, order: value });
                    }} />
            </span>
            {/* enterkeyでsubmitされるようにsubmitkeyを隠しておく、なおinputが1つの場合に限りenterkey押下でsubmitされる現象がある
            https://stackoverflow.com/questions/1370021/why-does-forms-with-single-input-field-submit-upon-pressing-enter-key-in-input
            */}
            {/* <input type="submit" style={{ display: 'none' }} /> */}
        </Form>
    )
}


export default SearchConditions;