import { title } from "process";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Dropdown, Grid, Icon, Input, InputProps, Label } from "semantic-ui-react";
import * as categoryConst from '../const/category';
import * as orderConst from '../const/order';
import useFetchTags from "../hooks/useFetchTags";
import searchConditions from "../type/searchQuizesConditions";
import tag from "../type/tag";
import AutoCompleteField from "./common/AutoCompleteField";
import OrderList from './OrderList';



interface SearchConditions extends ReactElement { }


type tagProp = {
    content: string,
    deleteThis: () => void
    keyIndex?: number,
}

const TagField: React.FC<tagProp> = (prop: tagProp) => {

    return (
        <Label key={prop.keyIndex}  >
            <Icon name='tag' />
            {prop.content}
            <Icon name='delete' onClick={prop.deleteThis} />
        </Label>
    )
}


type prop = {
    conditions: searchConditions
    setConditions: (title: searchConditions) => void
}


const SearchConditions: React.FC<prop> = (prop: prop) => {
    // const [category, setCategory] = useState<categoryConst.categoryId>(categoryConst.categoryId.all);
    const [wheretitle, setWhereTitle] = useState<string>('');
    const [tags, setTags] = useState<tag[]>([]);

    const [searchMode, setSearchMode] = useState<'title' | 'tag'>('title');

    const [inputValue, setInputValue] = useState<string>('');
    const [tagProps, setTagProps] = useState<tagProp[]>([]);
    const tagPropsRef = useRef<tagProp[]>(tagProps);
    
    const [list, setList] = useState<tag[]>([]);
    const [tagCandidates, setTagCandidates] = useFetchTags();

    useEffect(() => setList(tagCandidates.tags), [tagCandidates])

    const onSelectOption = (e: any, { value }: any) => {
        setSearchMode(value);
    }

    const addTag = (inputValue: string) => {
        if (tagProps.find(t => t.content === inputValue))
            return
        const deleteThis = () => setTagProps(tagPropsRef.current.filter(t => t.content !== inputValue))
        tagProps.push({ content: inputValue, deleteThis: deleteThis })
        setTagProps([...tagProps])
    }

    const inputProp: InputProps = {
        icon: 'tags',
        iconPosition: 'left',
        label: { tag: true, content: 'タグを追加', onClick: () => addTag(inputValue) },
        labelPosition: 'right',
        placeholder: 'タグを入力してください',
    }
    const preAutoComplete = () => {
        setTagCandidates(inputValue);
    }

    const titleSearch = <Input size="small" onChange={(e) => setWhereTitle(e.target.value)}
        action={{ "size": "tiny", "content": '検索', "icon": 'search', 'onClick': () => prop.setConditions({ ...prop.conditions, order: orderConst.orderId.newOrder, title: wheretitle }) }} />
    const tagSearch = <AutoCompleteField
                lists={list.map(t => t.content + "(" + t.count + ")")}
                inputProp={inputProp}
                value={inputValue}
                setValue={setInputValue}
                preAutoComplete={preAutoComplete}
            />

    //コンポーネントをこれ一つに統合したい
    return (
        <Grid>
            {/* <Categories setCategory={setCategory} /> */}
            <Grid.Row>
                <OrderList setOrder={(order: orderConst.orderId) => prop.setConditions({ ...prop.conditions, order: order })} />
            </Grid.Row>
            {/* <WhereTitle setWhereTitle={setWhereTitle} onButtonClick = {() => prop.setConditions({ ...prop.conditions, category: category, order: order, title: wheretitle })} /> */}
            <Grid.Row>
                <Dropdown button compact defaultValue={searchMode} options={[
                    { key: 1, text: 'タイトルで検索', value: 'title' },
                    { key: 2, text: 'タグで検索', value: 'tag' }
                ]} />
                <Input size="small" onChange={(e) => setWhereTitle(e.target.value)}
                    action={{ "size": "tiny", "content": '検索', "icon": 'search', 'onClick': () => prop.setConditions({ ...prop.conditions, order: orderConst.orderId.newOrder, title: wheretitle }) }} />
            </Grid.Row>
            {/* //TODO:should add tags */}
        </Grid>

    )
}


export default SearchConditions;