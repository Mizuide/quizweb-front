import { useEffect, useState } from "react";
import { COOKIE_KEY_QUIZ_TITLE, COOKIE_KEY_QUIZ_URL } from "../../const/const";
import { getCookie, removeCookie } from "../../util/cookieUtil";
import TweetButton from "../common/TweetButton";

const Confirmation: React.FC = () => {
    const [decodeTitle, setDecodeTitle] = useState('')
    const [decodeURL, setDecodeURL] = useState('');

    const tweetText = `クイズ「${decodeTitle}」を作成しました！
    チャレンジしてみてね！`

    useEffect(() => {
        let title = getCookie(COOKIE_KEY_QUIZ_TITLE);
        let url = getCookie(COOKIE_KEY_QUIZ_URL);
        if (title !== null && url !==null) {
            setDecodeTitle(decodeURI(title));
            setDecodeURL(decodeURI(url));
        }
        removeCookie(COOKIE_KEY_QUIZ_TITLE);
        removeCookie(COOKIE_KEY_QUIZ_URL);
    }, [])
    return (
        <>
            {decodeTitle}を作成しました！
            <br />
            twiiterで告知する→
            <TweetButton
                displayText="ツイートする"
                url={`${process.env.REACT_APP_FQDN}/${decodeURL}`}
                tweetText={tweetText} />
        </>
    )
}

export default Confirmation;