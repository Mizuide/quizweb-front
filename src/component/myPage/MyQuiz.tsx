import { Button, Item } from "semantic-ui-react";
import quiz from "../../type/quiz";
import no_image from '../../img/no_image.png';

type prop = {
  quiz: quiz
}

const MyQuiz: React.FC<prop> = (prop: prop) => {
  let url;
  if (prop.quiz.thumbnail) {
    url = '/quizWeb/img/thumbnail/' + prop.quiz.thumbnail
  } else {
    url = no_image
  }

  return (
    <Item>
      <Item.Image size={"medium"} src={url} />
      <Item.Content>
        <Item.Header>
          {prop.quiz.title}
        </Item.Header>
        <Item.Description>
          <Button color="blue" content="編集する" />
          <Button color="red" content="削除する" />
        </Item.Description>
      </Item.Content>
    </Item>

  )
}

export default MyQuiz;