import quizDetail from "../type/quizDetail";
import axios from "axios";
import { useEffect } from "react";

type prop = {
  numOfCorrect:number;
  quiz:quizDetail;
}

const AVARAGE_URL = "/quizWeb/avarage";

const FinalResult: React.FC<prop> = (prop: prop) => {
    useEffect(() => {axios.post(AVARAGE_URL,{"correct":prop.numOfCorrect,"quizId":prop.quiz.id})},[])
  return(
    <div className='finalResult'>
        あなたの正解数は・・・
        {`${prop.quiz.questions.length}問中${prop.numOfCorrect}問正解でした！`}
    </div>
  )
}

export default FinalResult;