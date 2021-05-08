
type quizDetail = {
    id:number,
    crete_username:string,
    title:string,
    description:string,
    thumbnail:string,
    category:string,
    tag:string,
}

export type question = {
    id:number,
    num:number,
    name:string,
    content:string,
    comment:string,
    choices:choice[]
}

export type choice = {
    qusetionId:number,
    selection_no:number,
    content:string,
}
export default quizDetail;