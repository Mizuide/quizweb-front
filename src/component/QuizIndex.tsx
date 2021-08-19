import { ReactElement, useEffect, useState } from "react";
import searchConditions from "../type/searchQuizesConditions";
import fetchQuizParam from "../type/fetchQuizParam";
import useFetchQuizes from "../hooks/useFetchQuizes";
import Pager from "./Pager";
import Index from "./Index";
import * as categoryConst from '../const/category';
import * as orderConst from '../const/order';
import SearchConditions from "./SearchConditions";
import quiz from "../type/quiz";
import useIndex from "../hooks/useIndex";



const QuizIndex: () => ReactElement = () => {
    //todo:implements change displayNumber 
    const [displayNum,setDisplayNum] = useState<number>(10);
    
    const [quizesInfo, setFetchQuiz] = useFetchQuizes();
    const [page, setPage] = useState<number>(1);
    const [index, setIndex] = useIndex(displayNum);
    const [quizCount,setQuizCount] = useState<number>(0);

    let initialSearchConditions: searchConditions = {
        category: categoryConst.categoryId.all,
        title: '',
        order: orderConst.orderId.newOrder,
        displayNum:displayNum
    }
    const [searchConditions, setSearchConditions] = useState<searchConditions>(initialSearchConditions);

    let initialFetchParan: fetchQuizParam = {
        page:page,
        searchConditions: searchConditions
    };
    const [fetchParam] = useState<fetchQuizParam>(initialFetchParan);

    const changeOnPage = () => {
        setFetchQuiz({ ...fetchParam, page});
        setIndex(quizesInfo.quizes, page);
    }

    useEffect(() => {
        setIndex(quizesInfo.quizes, page);
        setQuizCount(quizesInfo.count);
    }
    , [quizesInfo]);
    useEffect(() => setFetchQuiz({ ...fetchParam, searchConditions }), [searchConditions]);
    useEffect(changeOnPage, [page]);

    return (
        <div>
            <SearchConditions conditions={searchConditions} setConditions={setSearchConditions} />
            <Index display={index} />
            <Pager page={page} setPage={setPage} quizCount={quizCount} display={displayNum} />
        </div>
    )
}

export default QuizIndex;