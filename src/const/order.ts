export const orderId = {new:'new',old:'old',view:'view'} as const;
export type orderId =typeof orderId[keyof typeof orderId]; //valueのリテラル値を取る、keyと同一名称のためkeyofでも問題なし

export type order = {
    id:orderId;
    name:string;
}

export const orderList: readonly order[] = [
    { id: 'new', name: '新着順' },
    { id: 'old', name: '古い順' },
    { id: 'view', name: '閲覧数順'},
] as const;
