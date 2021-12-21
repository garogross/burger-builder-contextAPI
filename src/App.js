import React from 'react'
import { Route, Routes } from "react-router-dom"

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import ContactData from './containers/Checkout/ContactData/ContactData';

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
           <Route path="/checkout" element={<Checkout />} >
            <Route
              path='contact-data'
              element={<ContactData />} />
          </Route>
          <Route path="/orders" element={<Orders />} />
        <Route path="/" element={<BurgerBuilder />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
