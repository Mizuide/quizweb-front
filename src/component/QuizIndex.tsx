import { ReactElement, useEffect, useState } from "react";
import * as orderConst from '../const/order';
import useFetchQuizes from "../hooks/useFetchQuizes";
import fetchQuizParam from "../type/fetchQuizParam";
import searchConditions from "../type/searchQuizesConditions";
import Index from "./Index";
import Pager from "./Pager";
import SearchConditions from "./SearchConditions";



const QuizIndex: () => ReactElement = () => {
    //todo:implements change displayNumber 
    const [displayNum, setDisplayNum] = useState<number>(10);

    const [quizesInfo, setFetchQuiz] = useFetchQuizes();
    const [page, setPage] = useState<number>(1);
    // const [index, setIndex] = useIndex(displayNum);
    const [quizCount, setQuizCount] = useState<number>(0);

    let initialSearchConditions: searchConditions = {
        title: '',
        order: orderConst.orderId.newOrder,
        tags: []
    }
    const [searchConditions, setSearchConditions] = useState<searchConditions>(initialSearchConditions);

    let initialFetchParan: fetchQuizParam = {
        fetchSize: displayNum,
        page: page,
        searchConditions: searchConditions
    };
    const [fetchParam] = useState<fetchQuizParam>(initialFetchParan);

    const changeOnPage = () => {
        setFetchQuiz({ ...fetchParam, page: page });
    }

    useEffect(() => {setQuizCount(quizesInfo.count)
    console.log(quizesInfo);
    }, [quizesInfo]);
    useEffect(() => setFetchQuiz({ ...fetchParam, searchConditions: searchConditions }), [searchConditions]);
    useEffect(changeOnPage, [page]);

    return (
        <>
            <SearchConditions conditions={searchConditions} setConditions={setSearchConditions} />
            <Index quizes={quizesInfo.quizes} />
            <Pager page={page} setPage={setPage} quizCount={quizCount} display={displayNum} />
        </>
    )
}

export default QuizIndex;