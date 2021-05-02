import {categoryId} from '../const/category'
import {orderId} from '../const/order'


type fetchQuizParam ={
    fetchCount:number;
    where:{
        category:categoryId;
        title:string;
    }
    order:orderId;
}

export default fetchQuizParam;