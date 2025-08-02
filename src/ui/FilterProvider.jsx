import { createContext, useReducer } from "react";

const FilterContext = createContext();

const initialState = { type: "bag", cart: [], bill: 0 };

function FilterReducer(state, action) {
  switch (action.type) {
    case "SetFilter":
      return { ...state, type: action.payload };
    case "AddToCart":
      return { ...state, cart: [...state.cart, action.payload] };
    case "RemoveFromCart":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    case "SetTotalBill":
      return { ...state, bill: action.payload };
    case "ClearCart":
      return { ...state, cart: [] };

    default:
      return state;
  }
}

export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(FilterReducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext };
