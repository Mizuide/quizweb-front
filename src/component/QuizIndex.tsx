import { ReactElement, useEffect, useState } from "react";
import * as fetch from "../util/fetchAPI";
import quiz from "../type/quiz";
import LinkToQuiz from "./LinkToQuiz";

const displayNum = 10;
const fetchSize = 100;
const maxPage = displayNum / fetchSize;

const useFetchQuizes = function (): [quiz[] | null, () => void] {
    let [count, setCount] = useState<number>(1);
    let [quizes, setQuizes] = useState<quiz[]>([]);
    let setFetchQuiz = function () {
        fetch.fetchQuestions(count).then(res => setQuizes(quizes.concat(quizes))).then(() => setCount(count + 1));
    }
    return [quizes, setFetchQuiz];
}

const useIndex = function (quizes: quiz[] | null, displayNum: number): [LinkToQuiz[] | null, (num: number) => void] {
    let [index, setIndex] = useState<(ReactElement)[] | null>(null);
    let setter = function (page: number) {
            if (quizes !== null) {
                let links: (LinkToQuiz | null)[] = quizes.map((q) => LinkToQuiz(q));
                setIndex(links.filter((l): l is LinkToQuiz => l !== null));
                quizes.slice((page - 1) * displayNum, page * displayNum);
            }
    }
    return [index, setter];
}


function QuizIndex() {
    let [quizes, setFetchQuiz] = useFetchQuizes();
    let [page, setPage] = useState(0);
    let [index, setIndex] = useIndex(quizes, displayNum);

    const changeOnPage = () => {
        setIndex(page);
        if (page % maxPage === 1) {
            setFetchQuiz();
        }
    }

    useEffect(changeOnPage, [page]);


    return (
        <div>
            {index}
            <button onClick={() => setPage(page + 1)}  value="hogehoge"/>
        </div>
    )
}

export default QuizIndex;