import { ReactElement } from "react";
import { useHistory } from 'react-router-dom';
import { Item } from "semantic-ui-react";
import quiz from '../type/quiz';

interface LinkToQuiz extends ReactElement { }

type prop = {
  quiz: quiz
}

const LinkToQuiz: React.FC<prop> = (prop: prop): LinkToQuiz => {
  const history = useHistory();
 
  return (
    <Item onClick={() => history.push('/game/' + prop.quiz.id)}>
        <Item.Image size={"small"} src={prop.quiz.thumbnail} />
      <Item.Content>
        <Item.Header>
            {prop.quiz.title}
        </Item.Header>
        <Item.Description>
            {prop.quiz.description}
        </Item.Description>
      </Item.Content>
    </Item>

  )
}

export default LinkToQuiz;