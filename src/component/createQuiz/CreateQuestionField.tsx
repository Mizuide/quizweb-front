import { useContext, useEffect, useState } from "react";
import { useChangeQuestion } from "../../hooks/useChangeQuizContext";
import CreateChoiceForm from "./CreateChoiceForm";
import { QuizInfoContext } from "./CreateQuizForm"

type prop = {
    index: number;
}

const CreateQuestionField: React.FC<prop> = (prop: prop) => {
    const [content, setContent] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const  changeQuestion = useChangeQuestion();

    useEffect(() => {
        changeQuestion(content,comment,prop.index);

    }, [content, comment])

    return (
        <div className='CreateQuestionField'>
            <input type="textarea" placeholder="問題文を入力してください" onChange={(e) => setContent(e.target.value)} />
            <CreateChoiceForm quesitonIndex={prop.index} />
            <input type="text" placeholder="回答後に表示されるコメントを入力してください" onChange={(e) => setComment(e.target.value)} />
        </div>
    )
}

export default CreateQuestionField;