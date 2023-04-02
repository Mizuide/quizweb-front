import { useEffect, useState } from "react";
import useFetchCreateQuizParam from "../../hooks/useFetchCreateQuizParam";
import createQuizParam from "../../type/createQuizParam";
import CreateQuizForm from "../createQuiz/CreateQuizForm";
const CreateQuiz: React.FC = () => {
    
    const [createQuizRes, setCreateQuizRes] = useFetchCreateQuizParam();
    const [ready, setReady] = useState<JSX.Element>(<></>);
    const [createQuizParam, setCreateQuizParam] = useState<createQuizParam>({
        id: 0,
        createUserId: 0,
        title: '',
        description: '',
        questions: [],
        tags: []
    });

    useEffect(() => {
        setCreateQuizRes();
    }, []);

    useEffect(() => {
        setCreateQuizParam({
            ...createQuizParam,
            id: createQuizRes.quizId,
            createUserId: createQuizRes.createUserId,
        });
    }, [createQuizRes])

    useEffect(() => {
        if (createQuizParam.id != 0)
            setReady(<CreateQuizForm editQuizParam={createQuizParam} />);
    }, [createQuizParam]
    )
    return (
        <>
            {ready}
        </>
    )

}

export default CreateQuiz;