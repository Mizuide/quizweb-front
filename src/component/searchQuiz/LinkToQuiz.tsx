import { ReactElement, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card, Icon, Image, Label } from "semantic-ui-react";
import { loginUserContext } from "../../App";
import no_image from '../../img/no_image.png';
import quiz from '../../type/quiz';
import tag from "../../type/tag";
import '../common/css/hoverItem.css';
import EditButton from "./EditButton";

interface LinkToQuiz extends ReactElement { }

type prop = {
  quiz: quiz
}

const LinkToQuiz: React.FC<prop> = (prop: prop): LinkToQuiz => {
  const history = useHistory();
  const loginUser = useContext(loginUserContext);
  let url;
  if (prop.quiz.thumbnail) {
    url = '/quizWeb/img/thumbnail/' + prop.quiz.thumbnail
  } else {
    url = no_image
  }
  const TagField = (tag: tag, index: number) =>
  (<Label key={index}>
    <Icon name='tag' />
    {tag.tag}
  </Label>)

  const TagFields = prop.quiz.tags?.map((t, i) => TagField(t, i));


  return (
    <Card>
      {/* <Image src={url} /> */}
      <Card.Content className="hoverItem" onClick={() => history.push('/game/' + prop.quiz.id)}>
        <Card.Header> {prop.quiz.title}</Card.Header>
        <Card.Meta> {TagFields}</Card.Meta>
        <Card.Description>
          {prop.quiz.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <EditButton quiz={prop.quiz} />
      </Card.Content>
    </Card>

  )
}

export default LinkToQuiz;