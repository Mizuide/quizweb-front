//TODO: 使用してない。削除候補？
import { ReactElement, useState } from "react";
import LinkToQuiz from "../component/searchQuiz/LinkToQuiz";
import quizIndexInfo from "../type/quizIndexInfo";

const useIndex = function (displayNum: number): [LinkToQuiz[] | null, (quizes: quizIndexInfo[], page: number) => void] {
    const [index, setIndex] = useState<(ReactElement)[] | null>(null);
    const setDisplay = function (quizes: quizIndexInfo[], page: number) {

        let links: (LinkToQuiz | null)[] = quizes.map((q) => LinkToQuiz({ quizInfo: q }));
        // let disp = links.slice((page - 1) * displayNum, page * displayNum);
        setIndex(links.filter((l): l is LinkToQuiz => l !== null));
    }
    return [index, setDisplay];
}

export default useIndex;