import * as categoryConst from '../const/category'

type createQuizParam = {
    category: categoryConst.categoryId,
    description: string,
    title: string,
    questions:createQuestionParam[]
}

export type createQuestionParam = {
    content:string,
    comment:string,
    choices:createChoiceParam[]
}

export type createChoiceParam = {
    selectionNo:number,
    content:string
}

export default createQuizParam;