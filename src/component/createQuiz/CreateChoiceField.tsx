import { useState } from "react";
import { createChoiceParam } from "../../type/createQuizParam"

type prop = {
    choices: createChoiceParam[];
    setChoices: (param: createChoiceParam[]) => void;


}

const CreateChoiceField: React.FC<prop> = (prop: prop) => {
    const [content, setContent] = useState<string>("");

    return (
        <div className='createChoiceField'>
            <input type="text" placeholder="選択肢を入力してください" onChange={(e) => setContent(e.target.value)} />
        </div>
    )
}

export default CreateChoiceField;