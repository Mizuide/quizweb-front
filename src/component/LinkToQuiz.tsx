import { ReactElement } from "react";
import { Link } from 'react-router-dom'
import quiz from '../type/quiz'

interface LinkToQuiz extends ReactElement {

}

const LinkToQuiz: React.FC<quiz> = function (prop: quiz): LinkToQuiz {
  return (
    <li key={prop.id}>
      <Link to={'/game/' + prop.id}>
        {prop.id}
      </Link>
    </li>
  )
}

export default LinkToQuiz;