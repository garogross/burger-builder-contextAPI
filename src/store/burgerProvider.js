import burgerContext from "./burgerContext";
import { useReducer,useCallback } from "react";
import {
  GET_INGREDIENTS,
  ERROR_EXIST,
  PURCHASE,
  UPDATE_PURCHASE,
  ADD_INGREDIENTS,
  REMOVE_INGREDIENTS,
  CANCEL_PURCHASE,
  GET_ORDERS,
  LOADING_START,
  LOADING_OVER
} from "./types"
import axios from '../axios-orders';



const initialState = {
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
 orders: []
}


const burgerReducer = (state = initialState, action) => {
  const {
    type,
    payload,
    ingredients,
    totalPrice
  } = action
  switch (type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: payload
      }
    case ERROR_EXIST:
      return {
        ...state,
        error: true
      }
      case PURCHASE:
        return {
          ...state,
          purchasing: true
        }
    case UPDATE_PURCHASE:
      return {
        ...state,
        purchasable: payload
      }
      case ADD_INGREDIENTS:
        return {
          ...state,
          ingredients,
          totalPrice
        }
        case REMOVE_INGREDIENTS:
          return {
            ...state,
        ingredients,
        totalPrice
      }
      case CANCEL_PURCHASE:
        return {
          ...state,
          purchasing: false
      }
    case LOADING_START:
      return {
        ...state,
        loading: true
      }
    case LOADING_OVER:
      return {
        ...state,
        loading: false
      }
    case GET_ORDERS:
      return {
        ...state,
        orders: payload
      }
    default:
      return state
  }
}







const BurgerProvider = (props) => {

  const [burgerState, dispatch] = useReducer(burgerReducer, initialState)
  

  const getIngredients = useCallback( async () => {
    try {
      const { data } = await axios.get('/ingredients.json')
      dispatch({
        type: GET_INGREDIENTS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: ERROR_EXIST
      })
  
    }
  }
  ) 

  const purchase = () => {
    dispatch({
      type: PURCHASE
    })
  }

  const updatePurchase = (ingredients) =>  {
    const sum = Object.keys(ingredients)
      .map(
        igKey => {
          return ingredients[igKey];
        })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      console.log(sum > 0)
    dispatch({
      type: UPDATE_PURCHASE,
      payload: sum > 0
    })
  }

  const addIngredient = (type) => {
    const { ingredients, totalPrice, ingredientPrices } = burgerState

    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = ingredientPrices[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;
    dispatch({
      type: ADD_INGREDIENTS,
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    updatePurchase(updatedIngredients);
  }


  const removeIngredient = (type) => {
    const { ingredients, totalPrice, ingredientPrices } = burgerState

    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = ingredientPrices[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice - priceDeduction;
    dispatch({
      type: REMOVE_INGREDIENTS,
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    updatePurchase(updatedIngredients);
  }

  const cancelPurchase = () => {
    dispatch({
      type: "CANCEL_PURCHASE"
    })
  }


  const postOrder = async (data, navigate) =>  {
    dispatch({
      type: LOADING_START
    })
    try {
      const res = await axios.post("orders.json", data)
      dispatch({
        type: LOADING_OVER
      })
      dispatch({
        type: "CANCEL_PURCHASE"
      })
      navigate("/", { replace: true })


    } catch (error) {
      dispatch({
        type: LOADING_OVER
      })
    }
  }


  const getOrders = async () =>  {
    dispatch({
      type: LOADING_START
    })
    try {
      const { data } = await axios.get("orders.json")
      const fetchedOrders = [];
      console.log(data)
      for (let key in data) {
        fetchedOrders.push({
          ...data[key],
          id: key
        });
      }
      dispatch({
        type: GET_ORDERS,
        payload: fetchedOrders
      })
      dispatch({
        type: LOADING_OVER
      })

    } catch (error) {
      dispatch({
        type: LOADING_OVER
      })
    }
  }



  const {
    ingredients,
    error,
    loading,
    purchasing,
    totalPrice,
    purchasable,
    orders

  } = burgerState

  const burger = {
    ingredients,
    error,
    loading,
    purchasing,
    totalPrice,
    purchasable,
    orders,
    getIngredients,
    purchase,
    addIngredient,
    removeIngredient,
    cancelPurchase,
    postOrder,
    getOrders
  }
  return (
    <burgerContext.Provider value={burger}>
      {props.children}
    </burgerContext.Provider>
  )
}

export default BurgerProvider
