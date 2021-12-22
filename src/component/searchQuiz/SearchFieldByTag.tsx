import { useEffect, useState } from "react";
import { DropdownItemProps, DropdownProps, Form } from "semantic-ui-react";
import { SemanticWIDTHS } from "semantic-ui-react/dist/commonjs/generic";
import useFetchTags from "../../hooks/useFetchTags";
import tag from "../../type/tag";


type prop = {
    setTags: React.Dispatch<React.SetStateAction<tag[]>>
    width: SemanticWIDTHS
}

const SearchFieldByTag: React.FC<prop> = (prop: prop) => {
    {
        const [value, setValue] = useState<string[]>([]);
        const [searchQuery, setSearchQuery] = useState<string | undefined>('');

        const onChange = (e: any, data: DropdownProps) => {
            if (data.value) {
                if ((data.value as string[]).length > 10) {
                    return false;
                }
                prop.setTags(((data.value as string[]).map(v => { return { tag: v } })));
                setValue(data.value as string[]);
            }
        }

        const [list, setList] = useState<DropdownItemProps[]>([]);
        const [tagsInfo, fetchTagsInfo] = useFetchTags();

        const onSearchChange = (e: any, data: DropdownProps) => {
            setSearchQuery(data.searchQuery);
            if (data.searchQuery) {
                    fetchTagsInfo(data.searchQuery);
            }
        }
        useEffect(() => {
            fetchTagsInfo('');
        }, [])

        useEffect(() => {
            setList(
                tagsInfo.map((t, index: any) =>
                    ({ key: index, text: t.tag, value: t.tag })
                )
            )
        }, [tagsInfo])

        const renderLabel = (label: DropdownItemProps) => ({
            ...label,
            content: label.text,
            icon: 'tag',
            as: 'label'
        })

        return (
            <Form.Dropdown
                width={prop.width}
                search
                multiple
                selection
                options={list}
                onChange={onChange}
                onSearchChange={onSearchChange}
                searchQuery={searchQuery}
                renderLabel={renderLabel}
                value={value}
                placeholder={'タグを入力してください'}
                noResultsMessage={'その文字を含むタグはありません'}
            />
        )
    }
}

export default SearchFieldByTag;