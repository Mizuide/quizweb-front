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
  let url;
  if(prop.quiz.thumbnail)
    url = '/quizWeb/img/thumbnail/' + prop.quiz.thumbnail

  return (
    <Item onClick={() => history.push('/game/' + prop.quiz.id)}>
        <Item.Image size={"small"} src={url} />
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