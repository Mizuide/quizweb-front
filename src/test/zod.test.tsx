import { fireEvent, getByText, render, screen } from '@testing-library/react';
import * as zod from 'zod'



test('', async () => {
    try {
        const quizParamValid = zod.object({
            title: zod.string().nonempty({message:"タイトルは必須です"}),
            description: zod.string(),
            tests: zod.array(zod.object({ title: zod.string().nonempty() })).min(2)
        })
        const target = { title: '23', description: 'foo', tests: [{ title: '' }, { title: "" }] }
        quizParamValid.parse(target);
    } catch (error) {
        if(error instanceof zod.ZodError)
            console.log(error.issues[0]);
       
    }


})