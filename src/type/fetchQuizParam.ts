import quiz from './quiz';
import searchQuizesCondition from './searchQuizesConditions'


type fetchQuizParam = {
    // lastQuiz: quiz|null;
    page:number
    searchConditions: searchQuizesCondition
}

export default fetchQuizParam;