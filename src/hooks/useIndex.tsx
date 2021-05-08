import { ReactElement,  useState } from "react";
import LinkToQuiz from "../component/LinkToQuiz";
import quiz from "../type/quiz";

/**
 * 
 * displaynum...1ページに表示される件数
 * 
 * index...LinkToQuizの配列
 * setDisplay...quiz配列から対応するページ数の分だけ切り出し、indexにセットする
 */
const useIndex = function (displayNum: number): [LinkToQuiz[] | null, (quizes: quiz[], page: number) => void] {
    const [index, setIndex] = useState<(ReactElement)[] | null>(null);
    const setDisplay = function (quizes: quiz[], page: number) {
            let links: (LinkToQuiz | null)[] = quizes.map((q) => LinkToQuiz({quiz:q}));
            let disp = links.slice((page - 1) * displayNum, page * displayNum);
            setIndex(disp.filter((l): l is LinkToQuiz => l !== null));
        }
    return [index, setDisplay];
}

export default useIndex;