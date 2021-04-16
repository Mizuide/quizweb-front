import question from "./question";

type quiz = {
    id:number,
    crete_username:string,
    title:string,
    category:string,
    tag:string,
    questions:question[];

}
export default quiz ;