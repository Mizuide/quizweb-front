import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Icon } from "semantic-ui-react";
import { loginUserContext } from "../../App";
import quiz from "../../type/quiz";

type prop = {
    quiz: quiz
}

const EditButton: React.FC<prop> = (prop: prop) => {
    const loginUser = useContext(loginUserContext);
    const userAuthFlg = prop.quiz.createUserid && prop.quiz.createUserid === loginUser?.id;
    const history = useHistory();

    if (userAuthFlg) {
        return (
            <Button floated="right" size="mini" onClick={() => history.push(`/edit/${prop.quiz.id}`)} >
                <Icon name="edit" />
                編集
            </Button>
        )
    } else {
        return (<></>)
    }
}

export default EditButton;