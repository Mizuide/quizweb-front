import question from "./question";

type quiz = {
    id:number,
    crete_username:string,
    title:string,
    description:string,
    thumbnail:string,
    category:string,
    tag:string,
    //TODO:個別のページを開いたときにフェッチされるべき？
    questions:question[];

}
export default quiz ;