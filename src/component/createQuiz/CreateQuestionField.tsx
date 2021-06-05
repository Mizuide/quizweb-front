import { unzip } from "node:zlib";
import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { useChangeQuestion } from "../../hooks/useChangeQuizContext";
import { createQuestionParam, createChoiceParam } from "../../type/createQuizParam"
import CreateChoiceForm from "./CreateChoiceForm";
import { QuizInfoContext } from "./CreateQuizForm"

type prop = {
    index: number;
}

const CreateQuestionField: React.FC<prop> = (prop: prop) => {
    const [content, setContent] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const [quiz, setQuiz] = useContext(QuizInfoContext);
    const  changeQuestion = useChangeQuestion();
    //FIXME
    useEffect(() => {
        changeQuestion(content,comment,prop.index);
        // setQuiz({
        //     ...quiz, questions: quiz.questions.map(q => {
        //         if (q.indexId === prop.index) {
        //             return { ...q, content: content, comment: comment, }
        //         } else {
        //             return q;
        //         }
        //     })
        // });

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