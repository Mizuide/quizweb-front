import { ReactElement, useState} from "react";
import {createQuestionParam,createChoiceParam} from "../../type/createQuizParam"

type prop = {
    setQuestions:(param:createQuestionParam[]) => void
}

const CreateQuestionForm: React.FC<prop> = (prop: prop) => {

    const [quizes , setQuizes] = useState<createQuestionParam[]>([]);

    const addQuestion = () => {
        throw new Error("Function not implemented.");
    }

  return(
    <div className='createQuestionForm'>
      <div onClick={() => addQuestion()}>問題を追加</div> 
    </div>
  )
}

export default CreateQuestionForm;
