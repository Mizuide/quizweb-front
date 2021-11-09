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
                prop.setTags(((data.value as string[]).map(v => { return { content: v } })));
                setValue(data.value as string[]);
            }
        }

        const [list, setList] = useState<DropdownItemProps[]>([]);
        const [tagsInfo, fetchTagsInfo] = useFetchTags();

        const onSearchChange = (e: any, data: DropdownProps) => {
            setSearchQuery(data.searchQuery);
            if (data.searchQuery) {
                if (data.searchQuery.length === 1) {
                    fetchTagsInfo(data.searchQuery);
                }
            }
        }
        useEffect(() => {
            fetchTagsInfo();
        }, [])

        useEffect(() => {
            setList(
                tagsInfo.tags.map((t, index: any) => {
                    return { key: index, text: t.content, value: t.content }
                })
            )
        }, [tagsInfo])

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
                value={value}
                placeholder={'タグを入力してください'}
                noResultsMessage={'その文字を含むタグはありません'}
            />
        )
    }
}

export default SearchFieldByTag;