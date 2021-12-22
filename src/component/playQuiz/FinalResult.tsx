import quizDetail from "../../type/quizDetail";
import axios from "axios";
import { useEffect } from "react";
import TweetBottun from "../common/TweetButton";

type prop = {
  numOfCorrect: number;
  quiz: quizDetail;
}

const AVARAGE_URL = "/quizWeb/avarage";


const FinalResult: React.FC<prop> = (prop: prop) => {
  const tweetText = `${prop.quiz.title}に挑戦しました。
    結果は${prop.quiz.questions.length}問中${prop.numOfCorrect}問正解でした！`
  useEffect(() => { axios.post(AVARAGE_URL, { "correct": prop.numOfCorrect, "quizId": prop.quiz.id }) }, [])
  return (
    <div className='finalResult'>
      あなたの正解数は・・・
      {`${prop.quiz.questions.length}問中${prop.numOfCorrect}問正解でした！`}
      <TweetBottun displayText={'結果をツイートする'} tweetText={tweetText} url={`${process.env.REACT_APP_FQDN}/${prop.quiz.id}`} />
    </div>
  )
}

export default FinalResult  