import * as categoryConst from '../const/category'
import * as  zod from 'zod'
import choiceType from './choiceType'

type createQuizParam = {
    category: categoryConst.categoryId,
    title: string,
    description: string,
    thumbnail: string | undefined,
    questions: createQuestionParam[]
}

export type createQuestionParam = {
    indexId: number,
    content: string,
    comment: string,
    choiceType: choiceType,
    choices: createChoiceParam[]
}

export type createChoiceParam = {
    indexId: number,
    content: string,
    correctFlg: boolean

}

export const choiceParamValid = zod.object({
    content: zod.string().nonempty(),
    comment: zod.string()
})

export default createQuizParam;