import choicetype from './choicetype'

type question = {
    indexId: number,
    num: number,
    content: string,
    comment: string,
    choicetype:choicetype,
}

export default question;