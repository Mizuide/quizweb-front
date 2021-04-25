import { ReactElement, useEffect, useState } from "react";
import * as fetch from "../util/fetchAPI";
import quiz from "../type/quiz";
import LinkToQuiz from "./LinkToQuiz";
import Pager from "./Pager";

const displayNum = 10;
const fetchSize = 100;
const maxPage = fetchSize / displayNum;

let fetchCount = 1;

const useFetchQuizes = function (): [quiz[], () => void] {
    let [quizes, setQuizes] = useState<quiz[]>([]);
    let setFetchQuiz = function () {
        fetch.fetchQuizs(fetchCount).then(res => quizes.concat(res.data)).then(newQuizes => setQuizes(newQuizes)).then(() => fetchCount++);
    }
    return [quizes, setFetchQuiz];
}

const useIndex = function (displayNum: number): [LinkToQuiz[] | null, (quizes: quiz[], num: number) => void] {
    let [index, setIndex] = useState<(ReactElement)[] | null>(null);
    let setter = function (quizes: quiz[], page: number) {
        if (quizes !== null) {
            let links: (LinkToQuiz | null)[] = quizes.map((q) => LinkToQuiz(q));
            let disp = links.slice((page - 1) * displayNum, page * displayNum);
            setIndex(disp.filter((l): l is LinkToQuiz => l !== null));
        }
    }
    return [index, setter];
}


const QuizIndex:() => ReactElement = () => {
    let [quizes, setFetchQuiz] = useFetchQuizes();
    let [page, setPage] = useState(1);
    let [index, setIndex] = useIndex(displayNum);

    const changeOnPage = () => {
        if (quizes != null) {
            setIndex(quizes, page);
       }
        if (maxPage - page === 1) {
            setFetchQuiz();
        }
    }
    useEffect(() => setFetchQuiz(), [])

    useEffect(() => setIndex(quizes, page), [quizes]);
    useEffect(changeOnPage, [page]);
    

    return (
        <div>
            {index}
            <Pager page={page} setPage={setPage}/>
        </div>
    )
}

export default QuizIndex;