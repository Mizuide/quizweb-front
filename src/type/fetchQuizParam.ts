import quiz from './quiz';
import searchQuizesCondition from './searchQuizesConditions'


type fetchQuizParam = {
    lastQuiz: quiz|null;
    searchConditions: searchQuizesCondition
}

export default fetchQuizParam;