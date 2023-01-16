import * as zod from 'zod';


const tagValidation = zod.object({

})

const tagsValidation = zod.object({
    tags: zod.array(tagValidation).max(5)
})