import { ReactElement } from "react";
import { useHistory } from 'react-router-dom';
import { Icon, Item, Label } from "semantic-ui-react";
import quiz from '../../type/quiz';
import tag from "../../type/tag";
import no_image from '../img/no_image.png';

interface LinkToQuiz extends ReactElement { }

type prop = {
  quiz: quiz
}

const LinkToQuiz: React.FC<prop> = (prop: prop): LinkToQuiz => {
  const history = useHistory();

  let url;
  if (prop.quiz.thumbnail) {
    url = '/quizWeb/img/thumbnail/' + prop.quiz.thumbnail
  } else {
    url = no_image
  }
  const TagField = (tag: tag, index:number) =>
  (<Label key={index}>
    <Icon name='tag' />
    {tag.content}
  </Label>)

const TagFields = prop.quiz.tags.map((t,i) => TagField(t,i));



  return (
    <Item onClick={() => history.push('/game/' + prop.quiz.id)}>
      <Item.Image size={"medium"} src={url} />
      <Item.Content>
        <Item.Header>
          {prop.quiz.title}
        </Item.Header>
        <Item.Description>
          {prop.quiz.description}
        </Item.Description>
        <Item.Extra>
          {TagFields}
        </Item.Extra>
      </Item.Content>
    </Item>

  )
}

export default LinkToQuiz;