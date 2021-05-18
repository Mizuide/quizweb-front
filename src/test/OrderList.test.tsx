import { fireEvent, getByText, render, screen } from '@testing-library/react';
import OrderList from '../component/OrderList';
import * as orderConst  from '../const/order';



test('rendered', async () => {
    render(<OrderList setOrder={() => {}}/>);
    for(let order of orderConst.orderList){
        expect(screen.getByText(order.name)).toBeInTheDocument();
    }
})

test('click', async () => {
    let order:orderConst.orderId = orderConst.orderId.newOrder;
    let onClick = (id:orderConst.orderId) => order = id 

    render(<OrderList setOrder={onClick}/>);
    let target = screen.getByText('閲覧数順');
    fireEvent.click(target);

    expect(order as orderConst.orderId === orderConst.orderId.viewOrder).toBeTruthy();

})
