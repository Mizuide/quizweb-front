import { ReactElement, useState } from "react";
import LinkToQuiz from "../component/searchQuiz/LinkToQuiz";
import quiz from "../type/quiz";

const useIndex = function (displayNum: number): [LinkToQuiz[] | null, (quizes: quiz[], page: number) => void] {
    const [index, setIndex] = useState<(ReactElement)[] | null>(null);
    const setDisplay = function (quizes: quiz[], page: number) { 
        
            let links: (LinkToQuiz | null)[] = quizes.map((q) => LinkToQuiz({quiz:q}));
            // let disp = links.slice((page - 1) * displayNum, page * displayNum);
            setIndex(links.filter((l): l is LinkToQuiz => l !== null));
        }
    return [index, setDisplay];
}

export default useIndex;