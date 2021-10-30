import { ReactElement } from "react";
import { ItemGroup } from "semantic-ui-react";
import quiz from "../../type/quiz";
import waitingImg from '../../img/waiting.gif';
import LinkToQuiz from "./LinkToQuiz";

type prop = {
    quizes:quiz[]   
}

const Index: React.FC<prop> = (prop: prop) => {
    const display:ReactElement[] = [];
    for(let q of prop.quizes)
        display.push(<LinkToQuiz quiz={q}/>)    

    if (prop.quizes === null ||prop.quizes.length===0) {
        return (<nav className='index' ><img alt='読み込み中' src={waitingImg} /></nav>)
    } else {
        return (<ItemGroup divided>{display}</ItemGroup>)
    }
}

export default Index;