import LinkToQuiz from "./LinkToQuiz";
import waitingImg from '../img/waiting.gif';
import { Item, ItemGroup } from "semantic-ui-react";
import { Link } from "react-router-dom";

type prop = {
    display: LinkToQuiz[] | null
}

const Index: React.FC<prop> = (prop: prop) => {
    if (prop.display === null ||prop.display.length===0) {
        return (<nav className='index' ><img alt='読み込み中' src={waitingImg} /></nav>)
    } else {
        return (        <Link className={'link'} to={'/game/'} >
        <ItemGroup divided>{prop.display}</ItemGroup>        </Link>
)
    }
}

export default Index;