import choiceType from './choiceType'

type question = {
    indexId: number,
    num: number,
    content: string,
    comment: string,
    choiceType:choiceType,
}

export default question;