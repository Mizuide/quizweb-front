import { ReactElement, useRef, useState } from "react";
import { Button } from "semantic-ui-react";
import * as orderConst from "../const/order";

interface OrderList extends ReactElement { }

type prop = {
    setOrder: (id: orderConst.orderId) => void
}

const OrderList: React.FC<prop> = (prop: prop) => {
    const [active, setActive] = useState<orderConst.orderId>(orderConst.orderId.newOrder);

    type orderProp = {
        order: orderConst.order;
        setOrder: (id: orderConst.orderId) => void;
        key: number;
    }

    const Order: React.FC<orderProp> = (prop: orderProp) => {
        const onClick = (e: any) => {
            prop.setOrder(prop.order.id);
            setActive(e.target.name)
        }

        return (<Button size={"mini"} color={prop.order.id === active ? 'black' : undefined} name={prop.order.id}  key={prop.key} onClick={onClick}>{prop.order.name}</Button>)
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

    return (<span className='orderList'>{orderList}</span>);
}

export default OrderList;