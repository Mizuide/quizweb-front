import { ReactElement} from "react";
import quizDetail from '../type/quizDetail'

interface QuizDescription extends ReactElement { }

type prop = {
  quizDetail:quizDetail;
  onClickStart:() => void
}

const QuizDescription: React.FC<prop> = (prop: prop): QuizDescription => {
  return(
    <div className='quizDescription'>
        <div className='desCription'>
            {prop.quizDetail.description}
        </div>
        <img src={prop.quizDetail.thumbnail}/>
        <div className='startButton' onClick={prop.onClickStart}>スタート！</div>
    </div>
  )
}

export default QuizDescription;