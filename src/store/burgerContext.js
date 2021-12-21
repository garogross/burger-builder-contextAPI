import { createContext } from "react";


const burgerContext = createContext({
 ingredients: null,
 totalPrice: 4,
 purchasable: false,
 purchasing: false,
 loading: false,
 error: false,
 ingredientPrices: {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
 },
 orders: [],
 getIngredients: () => {},
 purchase: () => {},
 addIngredients: () => {},
 removeIngredients: () => {},
 cancelPurchase: () => {},
 postOrder: () => { },
 getOrders: () => {}


})


export default burgerContext