import LinkToQuiz from "./LinkToQuiz";
import waitingImg from '../img/waiting.gif';

type prop = {
    display: LinkToQuiz[] | null
}

const Index: React.FC<prop> = (prop: prop) => {
    if (prop.display === null ||prop.display.length===0) {
        return (<nav className='index' ><img alt='読み込み中' src={waitingImg} /></nav>)
    } else {
        return (<nav className='index' >{prop.display}</nav>)
    }
}

export default Index;