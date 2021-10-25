import axios from "axios";
import { useEffect, useRef, useState } from "react";
import 'react-autocomplete-input/dist/bundle.css';
import { Icon, InputProps, Label } from "semantic-ui-react";
import useFetchTags from "../../hooks/useFetchTags";
import tag from "../../type/tag";
import AutoCompleteField from "../common/AutoCompleteField";

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
    setTags: React.Dispatch<React.SetStateAction<tag[]>>
}

const TagFields: React.FC<prop> = (prop: prop) => {
    const [tagProps, setTagProps] = useState<tagProp[]>([]);
    const [field, setField] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const [list, setList] = useState<tag[]>([]);
    const [tagCandidates, setTagCandidates] = useFetchTags();

    useEffect(() => setList(tagCandidates.tags), [tagCandidates])

    const tagPropsRef = useRef<tagProp[]>(tagProps);

    useEffect(() => {
        tagPropsRef.current = tagProps;
        prop.setTags(tagProps.map(tp => { return { content: tp.content } }))
        setField(tagProps.map((p, index) =>
            TagField({ ...p, keyIndex: index })
        ))
    }, [tagProps])

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

    return (
        <>
            <AutoCompleteField
                label="タグ"
                lists={list.map(t => t.content)}
                inputProp={inputProp}
                value={inputValue}
                setValue={setInputValue}
                preAutoComplete={preAutoComplete}
            />
            {field}
        </>
    )
}


export default TagFields;