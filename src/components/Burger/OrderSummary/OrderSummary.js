import React,{useContext} from 'react'
import burgerContext from './../../../store/burgerContext';

import Aux from '../../../hoc/Auxx/Auxx';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
 const {
  ingredients,
  totalPrice,
  cancelPurchase
 } = useContext(burgerContext)

    const purchaseCancelHandler = () => {
     cancelPurchase()
    }

    const ingredientSummary = Object.keys(ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredients[igKey]}
                </li>);
        });
    

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={purchaseCancelHandler}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default OrderSummary
