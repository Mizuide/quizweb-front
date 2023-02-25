import { Dropdown, Input } from "semantic-ui-react";

type prop = {
    setTitle: React.Dispatch<React.SetStateAction<string>>
    dropDown: JSX.Element
}

const SearchFieldByTitle: React.FC<prop> = (prop: prop) => {

    return (
        <>
            {prop.dropDown}
            <Input
                type="search"
                fluid
                placeholder="クイズのタイトルを入力してください"
                onChange={(e) => prop.setTitle(e.target.value)} />
        </>
    )
}

export default SearchFieldByTitle;