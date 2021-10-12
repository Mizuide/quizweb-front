import tag from "./tag";

type quiz = {
    id: number,
    crete_username: string,
    title: string,
    description: string,
    thumbnail: string,
    tags: tag[],
    category: string,
}

export default quiz;