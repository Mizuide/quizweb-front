import question from "./question";

type quiz = {
    id:number,
    crete_username:string,
    title:string,
    description:string,
    thumbnail:string,
    category:string,
    tag:string,
    questions:question[];

}
export default quiz ;