import { ReactElement, useEffect, useState } from "react";
import { createQuestionParam, createChoiceParam } from "../../type/createQuizParam"


type prop = {
    questions: createQuestionParam[];
    setQuestions: (param: createQuestionParam[]) => void;
    index: number;

}

const CreateQuestionField: React.FC<prop> = (prop: prop) => {
    const [content, setContent] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [choices, setChoices] = useState<createChoiceParam[]>([]);

    const [question, setQuestion] = useState<createQuestionParam>({ indexId: prop.index, content: content, comment: comment, choices: choices });

    useEffect(() => {
        prop.setQuestions(prop.questions.map(q => {
            if (q.indexId === prop.index) {
                return { ...q,content:content,comment:comment,choices:choices}
            } else {
                return q;
            }

        }));
    }, [content, comment, choices])

    return (
        <div className='CreateQuestionField'>
            <input type="textarea" placeholder="問題文を入力してください" onChange={(e) => setContent(e.target.value)} />
            {/* create choices component */}
            <input type="text" placeholder="回答後に表示されるコメントを入力してください" onChange={(e) => setComment(e.target.value)} />
        </div>
    )
}

export default CreateQuestionField;