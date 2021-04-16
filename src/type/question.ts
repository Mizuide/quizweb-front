import choice from "./choice";

type question = {
    id:number,
    num:number,
    name:string,
    content:string,
    choices:choice[]
}

export default question;