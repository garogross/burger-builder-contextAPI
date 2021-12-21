import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import burgerContext from './../../../store/burgerContext';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

const ContactData = () => {
 const navigate = useNavigate()
 const {
  ingredients,
  totalPrice,
  loading,
  postOrder
 } = useContext(burgerContext)


 const [formData, setFormData] = useState({

  name: '',
  email: '',
  street: '',
  postalCode: ''

 })

 const {
  name,
  email,
  street,
  postalCode
 } = formData

 const onChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
 }

 const orderHandler = () => {
  const orderData = {
   ingredients,
   price: totalPrice,
   costumer: {
    name,
    email,
    address: {
     street,
     postalCode
    }
   }
  }
  postOrder(orderData, navigate)
 }
 let form = (
  <form>
   <input
    className={classes.Input}
    value={name}
    type="text"
    name="name"
    placeholder="Your Name"
    onChange={(e) => onChange(e)}
   />
   <input
    className={classes.Input}
    value={email}
    type="email"
    name="email"
    placeholder="Your Mail"
    onChange={(e) => onChange(e)}
   />
   <input
    className={classes.Input}
    value={street}
    type="text"
    name="street"
    placeholder="Street"
    onChange={(e) => onChange(e)}
   />
   <input
    className={classes.Input}
    value={postalCode}
    type="number"
    name="postalCode"
    placeholder="Postal Code"
    onChange={(e) => onChange(e)}
   />
   <Button btnType="Success" clicked={orderHandler}>ORDER</Button>
  </form>
 );
 if (loading) {
  form = <Spinner />;
 }
 return (
  <div className={classes.ContactData}>
   <h4>Enter your Contact Data</h4>
   {form}
  </div>
 );
}

export default ContactData
