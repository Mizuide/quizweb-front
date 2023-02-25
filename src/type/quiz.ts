import tag from "./tag";

type quiz = {
    id: number,
    createUserid:number,
    title: string,
    description: string,
    thumbnail: string,
    tags: tag[],
    authOnPasswordFlg:boolean
}

export default quiz;