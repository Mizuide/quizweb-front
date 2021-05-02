import { ReactElement } from "react";
import * as orderConst from "../const/order";

interface OrderList extends ReactElement { }

type prop = {
    setOrder: (id:orderConst.orderId) => void
}

const OrderList: React.FC<prop> = (prop: prop) => {
    type orderProp = {
        order: orderConst.order;
        setOrder: (id: orderConst.orderId) => void;
        key: number;
    }

    const Order: React.FC<orderProp> = (prop: orderProp) => {
        return (<div className='order' key={prop.key} onClick={() => prop.setOrder(prop.order.id)}>{prop.order.name}</div>)
    }

    let orderList: ReactElement[] = [];
    let count = 0;
    for (let order of orderConst.orderList) {
        let orderElement = Order({ order: order, setOrder: prop.setOrder, key: count });
        if (orderElement !== null) {
            orderList.push(orderElement);
        }
        count++;
    }

    return (<div className='orderList'>{orderList}</div>);
}

export default OrderList;