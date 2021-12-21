import React,{useContext} from 'react'
import burgerContext from './../../../store/burgerContext';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxx/Auxx';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ show,children }) => {
 const { cancelPurchase} = useContext(burgerContext)


    const purchaseCancelHandler = () => {
     cancelPurchase()
    }
    return (
        <Aux>
            <Backdrop show={show} clicked={purchaseCancelHandler} />
            <div
                className={classes.Modal}
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}>
                {children}
            </div>
        </Aux>
    )
}

export default Modal
