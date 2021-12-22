type prop = {
    displayText:string
    tweetText: string
    url: string
}

const TweetButton: React.FC<prop> = (prop: prop) => {

    const href = `https://twitter.com/share?text=${prop.tweetText}&url=${prop.url}`


    const onClick = () => {
        window.open(href, 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1');
    }
    return (
        //   <a href="https://twitter.com/share" className="twitter-share-button">作成した問題をツイートする</a>
        <a onClick={onClick}
            className="twitter share_twitter" rel="nofollow">
                {prop.displayText}
        </a>
    )
}

export default TweetButton;