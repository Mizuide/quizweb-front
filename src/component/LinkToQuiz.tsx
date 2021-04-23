import { ReactElement } from "react";
import { Link } from 'react-router-dom'
import quiz from '../type/quiz'

interface LinkToQuiz extends ReactElement {

}

const LinkToQuiz: React.FC<quiz> = function (prop: quiz): LinkToQuiz {
  return (
    <Link to={'/game/' + prop.id} key ={prop.id}>
      <div>
          <div className='title'>
            {prop.title}
          </div>
          <div className='description'>
            {prop.description}
          </div>
          <div className='thumbnail'>
            <img src ={prop.thumbnail}/>
          </div>
      </div>
    </Link>
  )
}

export default LinkToQuiz;