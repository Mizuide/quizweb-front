import { Form } from "semantic-ui-react";
import { SemanticWIDTHS } from "semantic-ui-react/dist/commonjs/generic";

type prop = {
    setTitle: (title: string) => void
    width: SemanticWIDTHS
}

const SearchFieldByTitle: React.FC<prop> = (prop: prop) => {
    return (
        <Form.Input width={prop.width} onChange={(e) => prop.setTitle(e.target.value)} />
    )
}

export default SearchFieldByTitle;