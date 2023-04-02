import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchEditQuizParam from "../../hooks/useFetchEditQuizParam";
import CreateQuizForm from "../createQuiz/CreateQuizForm";


type routerParam = {
    id: string
    // password?: string
}

const EditQuiz: React.FC = () => {
    const routerProp: routerParam = useParams<routerParam>();
    const [editQuizParam, setEditQuizParam] = useFetchEditQuizParam();
      useEffect(() => setEditQuizParam(Number(routerProp.id)), []);

    return (
        <CreateQuizForm editQuizParam={editQuizParam} />
    )
}

export default EditQuiz;