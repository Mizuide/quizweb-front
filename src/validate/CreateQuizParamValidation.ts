import * as zod from 'zod';

const createChoiceParamValid = zod.object({
    content: zod.string().nonempty({ message: '選択肢の内容が入力されていません' }),
})

const validCreateQuestionParam = zod.object({
    content: zod.string().nonempty({ message: '問題文が入力されていません' }),
    choices: zod.array(createChoiceParamValid).min(2, { message: '選択肢は最低で2つ必要です' })
}
)

const validCreateQuizParam = zod.object({
    title: zod.string().nonempty({ message: 'クイズのタイトルが入力されていません' }),
    questions: zod.array(validCreateQuestionParam).min(1, { message: "問題は最低1つは必要です" })
}
)

export default validCreateQuizParam