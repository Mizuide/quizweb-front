import * as categoryConst from '../const/category'

type createQuizParam = {
    category: categoryConst.categoryId,
    description: string,
    title: string,
    questions: createQuestionParam[]
}

export type createQuestionParam = {
    indexId:number,
    content: string,
    comment: string,
    choices: createChoiceParam[]
}

export type createChoiceParam = {
    indexId:number,
    content: string,
    correctFlg: boolean
}

export default createQuizParam;