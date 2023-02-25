import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "semantic-ui-react";

type routerParam = {
    id: string
}

const InputEditPassword: React.FC = () => {
    const history = useHistory();
    const routerProp: routerParam = useParams<routerParam>();
    const [password, setPassword] = useState<string>('');
    return (
        <Form onSubmit={() => history.push(`/edit/${routerProp.id}/${password}`)}>
            <Form.Input onChange={(e) => setPassword(e.target.value)}
                label="作成時に設定したパスワードを入力してください" placeholder="パスワード" type="password" />
        </Form>
    )
}

export default InputEditPassword;