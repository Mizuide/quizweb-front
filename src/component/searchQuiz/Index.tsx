import { ReactElement } from "react";
import { Card } from "semantic-ui-react";
import waitingImg from '../../img/waiting.gif';
import quizIndexInfo from "../../type/quizIndexInfo";
import LinkToQuiz from "./LinkToQuiz";

type prop = {
    quizInfoList: quizIndexInfo[]
}

const Index: React.FC<prop> = (prop: prop) => {
    const display: ReactElement[] = [];
    let index = 0;
    if (prop.quizInfoList.length === 0)
        return (<>クイズは見つかりませんでした</>)
    for (let q of prop.quizInfoList) {
        display.push(<LinkToQuiz key={index} quizInfo={q} />)
        index++;
    }
    if (prop.quizInfoList === null) {
        return (<nav className='index' ><img alt='読み込み中' src={waitingImg} /></nav>)
    } else {
        return (<Card.Group centered stackable>{display}</Card.Group>)
    }
}

export default Index;