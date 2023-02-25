import { orderId } from '../const/order';
import tag from './tag';

type searchcondition = {
    title?: string;
    order?: orderId;
    tags?: tag[];
    createUserId?: number;
}

export default searchcondition;