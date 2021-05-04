import searchQuizesCondition from './searchQuizesCondition'

import {categoryId} from '../const/category'
import {orderId} from '../const/order'


export type searchConditions = {
    category:categoryId;
    title:string;
    order:orderId;
}

type fetchQuizParam ={    
    fetchCount:number;
    searchConditions:searchQuizesCondition
}

export default fetchQuizParam;