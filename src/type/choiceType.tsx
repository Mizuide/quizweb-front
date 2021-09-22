const choiceType =
 {single:'single',
 image:'image'} as const;
type choiceType = typeof choiceType[keyof typeof choiceType];
 //valueのリテラル値を取る、keyと同一名称のためkeyofでも問題なし

 export default choiceType;