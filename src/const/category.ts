export const categoryId = {all:'all',anime:'anime',movie:'movie',music:'music',target:'tarent',trivia:'trivia',study:'study',other:'other'} as const;
export type categoryId =typeof categoryId[keyof typeof categoryId]; //valueのリテラル値を取る、keyと同一名称のためkeyofでも問題なし

export type category = {
    id:categoryId;
    name:string;
    img:string;
}

export const categoryList: readonly category[] = [
    { id: 'all', name: '全て', img: '' },
    { id: 'anime', name: 'アニメ・漫画', img: '' },
    { id: 'movie', name: '小説・映画', img: '' },
    { id: 'music', name: '音楽', img: '' },
    { id: 'tarent', name: '芸能・芸能人', img: '' },
    { id: 'trivia', name: '知識・雑学', img: '' },
    { id: 'study', name: '学習', img: '' },
    { id: 'other', name: 'その他', img: '' },
] as const;
