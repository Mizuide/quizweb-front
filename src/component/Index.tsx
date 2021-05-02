import LinkToQuiz from "./LinkToQuiz";

type prop = {
    dispaly:LinkToQuiz[] | null
}

const Index:React.FC<prop> = (prop:prop) => {
    return (<nav className='index' >{prop.dispaly}</nav>)
}

export default Index;