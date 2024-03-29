import { ReactElement, useEffect, useState } from "react";
import * as orderConst from '../../const/order';
import useFetchQuizes from "../../hooks/useFetchQuizes";
import fetchQuizParam from "../../type/fetchQuizParam";
import searchConditions from "../../type/searchQuizesConditions";
import Index from "./Index";
import Pager from "./Pager";
import SearchConditions from "./SearchConditions";

const QuizIndex: () => ReactElement = () => {
    //todo:implements change displayNumber 
    const [displayNum, setDisplayNum] = useState<number>(12);

    const [quizesInfo, setFetchQuiz] = useFetchQuizes();
    const [page, setPage] = useState<number>(1);
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

    //TODO:bugっぽい,検索条件変えて検索したあとページ遷移すると、初期の検索条件で2ページ目表示しちゃう気がする。
    // setterいる
    const [fetchParam] = useState<fetchQuizParam>(initialFetchParan);

    const changeOnPage = () => {
        setFetchQuiz({ ...fetchParam, page: page });
    }

    useEffect(() => {
        setQuizCount(quizesInfo.count)
    }, [quizesInfo]);

    useEffect(() => setFetchQuiz({ ...fetchParam, searchConditions: searchConditions }),
        [searchConditions]);

    useEffect(changeOnPage, [page]);

    return (
        <>
            <SearchConditions conditions={searchConditions} setConditions={setSearchConditions} />
            <Index quizInfoList={quizesInfo.quizInfoList} />
            <Pager page={page} setPage={setPage} quizCount={quizCount} display={displayNum} />
        </>
    )
}

export default QuizIndex;