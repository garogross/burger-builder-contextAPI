
import React from 'react'
import { useNavigate,Outlet } from 'react-router';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


const Checkout = () => {
    const navigate = useNavigate()

    const checkoutCancelledHandler = () => {
        navigate(-1)
    }
    const checkoutContinuedHandler = () => {
        navigate("/checkout/contact-data", { replace: true })
    }
    return (
        <div>
            <CheckoutSummary
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />
            <Outlet/>

        </div>
    )
}

export default Checkout
