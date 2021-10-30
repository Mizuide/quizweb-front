import { ReactElement } from "react";
import { Image } from "semantic-ui-react";
import { answerStatus } from '../../const/answerStatus';
import correctImg from '../../img/correct.png';
import incorrectImg from '../../img/incorrect.png';
import waitingImg from '../../img/waiting.gif';

interface Result extends ReactElement { }

type prop = {
    answerStatus: answerStatus;
    comment: string;
}
const Result: React.FC<prop> = (prop: prop): Result => {
    let displayAttr: 'inline' | 'none' = 'inline';
    let displayImg;
    switch (prop.answerStatus) {
        case answerStatus.none:
            displayAttr = "none";
            break;
        case answerStatus.waiting:
            displayImg = (<Image alt='読み込み中' src={waitingImg} />);
            displayAttr = "none";
            break;
        case answerStatus.correct:
            displayImg = (<Image alt='正解' src={correctImg} />);
            break;
        case answerStatus.incorrect:
            displayImg = (<Image alt='不正解' src={incorrectImg} />);
            break;
    }

    const commentDisplay: React.CSSProperties = {
        display: displayAttr,
    };

    return (
        <div className='Result'>
            {displayImg}
            <div className='comment' style={commentDisplay}>{prop.comment}</div>
        </div>
    )
}

export default Result;