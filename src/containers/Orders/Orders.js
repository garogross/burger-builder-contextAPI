import React,{useEffect,useContext} from 'react'
import burgerContext from './../../store/burgerContext';

import Order from '../../components/Order/Order';


const Orders = () => {
 const { orders, getOrders} = useContext(burgerContext)

    useEffect(() => {
        getOrders()
    }, [])


        return (
            <div>
                {orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
}

export default Orders
