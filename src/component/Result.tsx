import { ReactElement } from "react";
import correctImg from '../img/correct.png';
import incorrectImg from '../img/incorrect.png';
import waitingImg from '../img/waiting.gif';

import { answerStatus } from '../const/answerStatus'

interface Result extends ReactElement { }

type prop = {
    answerStatus: answerStatus;
    comment: string;
}
const Result: React.FC<prop> = (prop: prop): Result => {
    let displayComment: 'inline' | 'none' = 'inline';
    let displayImg;
    switch (prop.answerStatus) {
        case answerStatus.waiting:
            displayImg = (<img src={waitingImg} />);
            displayComment = "none";
            break;
        case answerStatus.correct:
            displayImg = (<img src={correctImg} />);
            break;
        case answerStatus.incorrect:
            displayImg = (<img src={incorrectImg} />);
            break;
    }

    const commentDisplay: React.CSSProperties = {
        display: displayComment,
    };
    
    return (
        <div className='Result'>
            {displayImg}
            <div className='comment' style={commentDisplay}>{prop.comment}</div>
        </div>
    )
}

export default Result;