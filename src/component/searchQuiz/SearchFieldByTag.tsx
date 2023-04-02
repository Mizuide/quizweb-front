import React, { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownItemProps, DropdownProps } from "semantic-ui-react";
import useFetchTags from "../../hooks/useFetchTags";
import tag from "../../type/tag";


type prop = {
    setTags: React.Dispatch<React.SetStateAction<tag[]>>
    dropDowm: JSX.Element
}

const SearchFieldByTag: React.FC<prop> = (prop: prop) => {

    const [value, setValue] = useState<tag[]>([]);
    const [searchQuery, setSearchQuery] = useState<string | undefined>('');

    const [list, setList] = useState<DropdownItemProps[]>([]);
    const [tagsInfo, fetchTagsInfo] = useFetchTags();

    const onChange = (e: any, data: DropdownProps) => {
        if (data.value) {
            if ((data.value as string[]).length > 10) {
                return false;
            }
            prop.setTags(((data.value as string[]).map(v => { return { tag: v } })));
        }
        let tagsList: tag[] = [];
        (data.value as string[]).forEach(s => {
            tagsList.push({ id: tagsInfo.find(t => t.tag === s)?.id, tag: s });
        }
        )
        setValue(tagsList);
        setSearchQuery('');
    }

    const onSearchChange = (e: any, data: DropdownProps) => {
        setSearchQuery(data.searchQuery);
    }
    useEffect(() => {
        fetchTagsInfo(searchQuery || '');
    }, [searchQuery])

    useEffect(() => {
        // 選択したタグ情報は選択肢のリストの中に残さないと正常にフィールド内に表示されない
        const usedTagList = value.map((t) => ({ key: t.id, text: t.tag, value: t.tag }))
        const tagsInfoReduceUsedTag = tagsInfo.map(t => ({ key: t.id, text: t.tag, value: t.tag })).
            filter(t => usedTagList.findIndex(used => t.key === used.key) === -1)
        setList(
            [...usedTagList, ...tagsInfoReduceUsedTag]
        )
    }, [tagsInfo, value])

    const renderLabel = (label: DropdownItemProps) => ({
        ...label,
        content: label.text,
        icon: 'tag',
        as: 'label'
    })

    return (
        <>
            {prop.dropDowm}
            <Dropdown
                search
                fluid
                multiple
                selection
                options={list}
                onChange={onChange}
                onSearchChange={onSearchChange}
                searchQuery={searchQuery}
                renderLabel={renderLabel}
                placeholder={'タグを入力してください'}
                noResultsMessage={'その文字を含むタグはありません'}
            />
        </>
    )

}

export default SearchFieldByTag;