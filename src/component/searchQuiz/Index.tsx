import { ReactElement } from "react";
import { Card, ItemGroup } from "semantic-ui-react";
import quiz from "../../type/quiz";
import waitingImg from '../../img/waiting.gif';
import LinkToQuiz from "./LinkToQuiz";

type prop = {
    quizes: quiz[]
}

const Index: React.FC<prop> = (prop: prop) => {
    const display: ReactElement[] = [];
    let index = 0;
    if(prop.quizes.length === 0)
        return(<>クイズは見つかりませんでした</>)
    for (let q of prop.quizes) {
        display.push(<LinkToQuiz key={index} quiz={q} />)
        index++;
    }
    if (prop.quizes === null) {
        return (<nav className='index' ><img alt='読み込み中' src={waitingImg} /></nav>)
    } else {
        return (<Card.Group stackable>{display}</Card.Group>)
    }
}

export default Index;