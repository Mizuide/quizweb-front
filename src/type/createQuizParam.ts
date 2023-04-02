import * as  zod from 'zod'
import choicetype from './choicetype'
import tag from './tag'

type createQuizParam = {
    id: number,
    title: string,
    description: string,
    thumbnail?: string,
    tags: tag[],
    questions: createQuestionParam[]
    createUserId: number,
}

export type createQuestionParam = {
    id: number,
    quizId: number,
    content: string,
    comment: string,
    choicetype: choicetype,
    choices: createChoiceParam[],
    createUserId: number,
}

export type createChoiceParam = {
    id: number,
    content: string,
    correctFlg: boolean,
    createUserId: number
}

export const choiceParamValid = zod.object({
    content: zod.string().nonempty(),
    comment: zod.string()
})

export default createQuizParam;