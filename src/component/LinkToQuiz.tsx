import { ReactElement } from "react";
import { Link } from 'react-router-dom'
import quiz from '../type/quiz'

interface LinkToQuiz extends ReactElement { }

type prop = {
  quiz: quiz
}

const LinkToQuiz: React.FC<prop> = (prop: prop): LinkToQuiz => {
  return (
    <Link to={'/game/' + prop.quiz.id} key={prop.quiz.id}>
      <div>
        <div className='title'>
          {prop.quiz.title}
        </div>
        <div className='description'>
          {prop.quiz.description}
        </div>
        <div className='thumbnail'>
          <img src={prop.quiz.thumbnail} />
        </div>
      </div>
    </Link>
  )
}

export default LinkToQuiz;