import { Form } from "semantic-ui-react";
import { SemanticWIDTHS } from "semantic-ui-react/dist/commonjs/generic";

type prop = {
    setTitle: (title: string) => void
    width: SemanticWIDTHS
}

const SearchFieldByTitle: React.FC<prop> = (prop: prop) => {
    return (
        <Form.Input
        width={prop.width}
        placeholder="クイズのタイトルを入力してください"
        onChange={(e) => prop.setTitle(e.target.value)} />
    )
}

export default SearchFieldByTitle;