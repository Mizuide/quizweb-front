import { ReactElement, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card, Icon, Image, Label } from "semantic-ui-react";
import { loginUserContext } from "../../App";
import no_image from '../../img/no_image.png';
import quiz from '../../type/quiz';
import quizIndexInfo from "../../type/quizIndexInfo";
import tag from "../../type/tag";
import '../common/css/hoverItem.css';
import EditButton from "./EditButton";

interface LinkToQuiz extends ReactElement { }

type prop = {
  quizInfo: quizIndexInfo
}

const LinkToQuiz: React.FC<prop> = (prop: prop): LinkToQuiz => {
  const history = useHistory();
  let url;
  if (prop.quizInfo.quiz.thumbnail) {
    url = '/quizWeb/img/thumbnail/' + prop.quizInfo.quiz.thumbnail
  } else {
    url = no_image
  }
  const TagField = (tag: tag, index: number) =>
  (<Label key={index}>
    <Icon name='tag' />
    {tag.tag}
  </Label>)

  const TagFields = prop.quizInfo.tags.map((t, i) => TagField(t, i));

  return (
    <Card className="hoverItem" as={'div'} onClick={() => history.push('/game/' + prop.quizInfo.quiz.id)}>
      <Image src={url} verticalAlign='middle' />
      <Card.Content>
        <Card.Header> {prop.quizInfo.quiz.title}</Card.Header>
        <Card.Meta> {TagFields}</Card.Meta>
        <Card.Description>
          {prop.quizInfo.quiz.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {TagFields}
        <EditButton quiz={prop.quizInfo.quiz} />
      </Card.Content>
    </Card>

  )
}

export default LinkToQuiz;