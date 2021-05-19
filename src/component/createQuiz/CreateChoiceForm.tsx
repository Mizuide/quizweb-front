import { ReactElement, useState } from "react";
import { createChoiceParam } from "../../type/createQuizParam"


type prop = {
    choices: createChoiceParam[]
}

const CreateChoiceForm: React.FC<prop> = (prop: prop) => {
    const [index, setIndex] = useState<number>(2);

    const [addChoicesZone, setAddChoicesZone] = useState<ReactElement[]>([]);
    
    const [correct,setCorrect] = useState<number>(0);

    return (
        <div className='createChoiceForm'>

        </div>
    )
}

export default CreateChoiceForm;