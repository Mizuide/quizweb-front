
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
    const [quizes, setFetchQuiz] = useFetchQuizes();
    const [page, setPage] = useState<number>(1);
    const [index, setIndex] = useIndex(displayNum);

    let initialSearchConditions: searchConditions = {
        category: categoryConst.categoryId.all,
        title: '',
        order: orderConst.orderId.newOrder
    }
    const [searchConditions, setSearchConditions] = useState<searchConditions>(initialSearchConditions);

    let initialFetchParan: fetchQuizParam = {
        lastQuiz: null,
        searchConditions: searchConditions
    };
    const [fetchParam, setFetchParam] = useState<fetchQuizParam>(initialFetchParan);

    const changeOnPage = () => {
        setIndex(quizes, page);
        if (quizes.length - page * displayNum <= displayNum) {
            setFetchParam({ ...fetchParam, lastQuiz: quizes[quizes.length - 1] });
        }
    }

    useEffect(() => setIndex(quizes, page), [quizes]);
    useEffect(() => setFetchQuiz({ ...fetchParam, searchConditions: searchConditions , lastQuiz: null}), [searchConditions, fetchParam]);
    useEffect(changeOnPage, [page]);



    return (
        <div>
            <SearchConditions conditions={searchConditions} setConditions={setSearchConditions} />
            <Index display={index} />
            <Pager page={page} setPage={setPage} maxFlg={quizes.length <= displayNum*page} />
        </div>
    )
}

export default QuizIndex;