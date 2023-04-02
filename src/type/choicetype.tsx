const choicetype =
 {single:'single',
 image:'image'} as const;
type choicetype = typeof choicetype[keyof typeof choicetype];
 //valueのリテラル値を取る、keyと同一名称のためkeyofでも問題なし

 export default choicetype;