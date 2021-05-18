export const orderId = {newOrder:'newOrder',oldOrder:'oldOrder',viewOrder:'viewOrder'} as const;
export type orderId =typeof orderId[keyof typeof orderId]; //valueのリテラル値を取る、keyと同一名称のためkeyofでも問題なし

export type order = {
    id:orderId;
    name:string;
}

export const orderList: readonly order[] = [
    { id: 'newOrder', name: '新着順' },
    { id: 'oldOrder', name: '古い順' },
    { id: 'viewOrder', name: '閲覧数順'},
] as const;
