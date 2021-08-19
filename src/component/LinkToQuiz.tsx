import { ReactElement } from "react";
import { Link, useHistory } from 'react-router-dom'
import { Item } from "semantic-ui-react";
import quiz from '../type/quiz'

interface LinkToQuiz extends ReactElement { }

type prop = {
  quiz: quiz
}

const LinkToQuiz: React.FC<prop> = (prop: prop): LinkToQuiz => {
  const hist = useHistory();
  return (
      <Item >
          <Item.Image size={"small"} src={prop.quiz.thumbnail} />
        <Item.Content>
          <Item.Header>
            <Link to={'/game/' + prop.quiz.id} key={prop.quiz.id}>
              {prop.quiz.title}
            </Link>
          </Item.Header>
          <Item.Description>
            <Link to={'/game/' + prop.quiz.id} key={prop.quiz.id}>
              {prop.quiz.description}
            </Link>
          </Item.Description>
        </Item.Content>
      </Item>
    
  )
}

export default LinkToQuiz;