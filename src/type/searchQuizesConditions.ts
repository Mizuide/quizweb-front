import {categoryId} from '../const/category'
import {orderId} from '../const/order'


type searchcondition = {
    category:categoryId;
    title:string;
    order:orderId;
    displayNum:number;
}

export default searchcondition;