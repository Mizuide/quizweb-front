import { ReactElement, useEffect, useState } from "react";
import quiz from "../type/quiz";
import fetchQuizParam from "../type/fetchQuizParam";
import useIndex from "../hooks/useIndex";
import useFetchQuizes from "../hooks/useFetchQuizes";
import Pager from "./Pager";
import Index from "./Index";
import * as categoryConst from '../const/category';
import * as orderConst from '../const/order';


const displayNum = 10;
const fetchSize = 100;
const maxPage = fetchSize / displayNum;


const QuizIndex: () => ReactElement = () => {
    let [quizes, setFetchQuiz] = useFetchQuizes();
    let [page, setPage] = useState<number>(1);
    let [index, setIndex] = useIndex(displayNum);

    let initialFetchParan: fetchQuizParam = {
        fetchCount: 0,
        where: {
            category: categoryConst.categoryId.all,
            title: ''
        },
        order: orderConst.orderId.new
    };
    let [fetchParam, setFetchParam] = useState<fetchQuizParam>(initialFetchParan);



    const changeOnPage = () => {
        if (quizes != null) {
            setIndex(quizes, page);
        }
        //TODO:条件に不備あり
        if (maxPage - page === 1) {
            if (fetchParam !== undefined) {
                setFetchParam({ ...fetchParam, fetchCount: fetchParam.fetchCount + 1 });
            }
        }
    }
    useEffect(() => {
            setFetchQuiz(fetchParam)
    }, [fetchParam])
    useEffect(() => setIndex(quizes, page), [quizes]);
    useEffect(changeOnPage, [page]);


    return (
        <div>
            <Index dispaly={index} />
            <Pager page={page} setPage={setPage} />
        </div>
    )
}

export default QuizIndex;