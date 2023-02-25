import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchEditQuizParam from "../../hooks/useFetchEditQuizParam";
import CreateQuizForm from "../createQuiz/CreateQuizForm";


type routerParam = {
    id: string
    password?: string
}

const EditQuiz: React.FC = () => {
    const routerProp: routerParam = useParams<routerParam>();
    const [editQuizParam, setEditQuizParam] = useFetchEditQuizParam();
    useEffect(() => setEditQuizParam(Number(routerProp.id), routerProp.password), []);

    return (
        <CreateQuizForm editQuizParam={editQuizParam} password={routerProp.password} />
    )
}

export default EditQuiz;