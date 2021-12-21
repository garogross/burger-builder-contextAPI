import React, { useContext } from 'react';
import burgerContext from '../../../store/burgerContext';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
    const {
        totalPrice,
        purchasable,
        addIngredient,
        removeIngredient,
        purchase,
    } = useContext(burgerContext)

    const purchaseHandler = () => {
        purchase()
    }
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{totalPrice.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => addIngredient(ctrl.type)}
                    removed={() => removeIngredient(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!purchasable}
                onClick={purchaseHandler}>ORDER NOW</button>
        </div>
    );
}
export default BuildControls;