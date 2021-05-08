import { ReactElement, useEffect, useState } from "react";
import searchConditions from "../type/searchQuizesConditions";
import fetchQuizParam from "../type/fetchQuizParam";
import useIndex from "../hooks/useIndex";
import useFetchQuizes from "../hooks/useFetchQuizes";
import Pager from "./Pager";
import Index from "./Index";
import * as categoryConst from '../const/category';
import * as orderConst from '../const/order';
import SearchConditions from "./SearchConditions";


const displayNum = 10;

const QuizIndex: () => ReactElement = () => {
    let [quizes, setFetchQuiz] = useFetchQuizes();
    let [page, setPage] = useState<number>(1);
    let [index, setIndex] = useIndex(displayNum);

    let initialSearchConditions: searchConditions = {
        category: categoryConst.categoryId.all,
        title: '',
        order: orderConst.orderId.new
    }
    let [searchConditions, setSearchConditions] = useState<searchConditions>(initialSearchConditions);

    let initialFetchParan: fetchQuizParam = {
        fetchCount: 0,
        searchConditions: searchConditions
    };
    let [fetchParam, setFetchParam] = useState<fetchQuizParam>(initialFetchParan);

    const changeOnPage = () => {
        setIndex(quizes, page);
        if (quizes.length - page * displayNum === displayNum) {
            setFetchParam({ ...fetchParam, fetchCount: fetchParam.fetchCount + 1 });
        }
    }

    useEffect(() => setIndex(quizes, page), [quizes]);
    useEffect(() => setFetchQuiz({ ...fetchParam, searchConditions: searchConditions }), [searchConditions, fetchParam]);
    useEffect(changeOnPage, [page]);


    return (
        <div>
            <SearchConditions conditions={searchConditions} setConditions={setSearchConditions} />
            <Index dispaly={index} />
            <Pager page={page} setPage={setPage} />
        </div>
    )
}

export default QuizIndex;