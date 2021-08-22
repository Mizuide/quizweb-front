import searchQuizesCondition from './searchQuizesConditions';


type fetchQuizParam = {
    fetchSize:number
    page:number
    searchConditions: searchQuizesCondition
}

export default fetchQuizParam;