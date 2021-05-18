import { ReactElement, useState} from "react";
import {createQuestionParam,createChoiceParam} from "../../type/createQuizParam"


type prop = {
  question:createQuestionParam[],
  setQuestion:(param:createQuestionParam[]) => void
    

}

const CreateQuestionField: React.FC<prop> = (prop: prop) => {
  const [content,setContent] = useState<string>("");
  const [comment,setComment] = useState<string>("");  
  const [choices,setChoices] = useState<createChoiceParam[]>([]);

  const [question,setQuestion] = useState<createQuestionParam>({});

  prop.setQuestion(prop.question.concat(question));


    return(
    <div className='CreateQuestionField'>
      <input type="textarea" placeholder="問題文を入力してください" onChange={(e) => setContent(e.target.value)}/>
        {/* create choices component */}
      <input type="text" onChange={(e) => setComment(e.target.value)}/>
    </div>
  )
}

export default CreateQuestionField;