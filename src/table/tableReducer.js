import { ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../table/tableTypes.js';

// import { addProduct } from "./tableActions"
// import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from "../table/tableTypes.js"

export const initialState = {
  products: [
    {
      username: 'Iphone 15 pro max',
      email: 'Apple',
      password: 'Blue',
      id: Math.random(),
    },
  ],
  data: [],
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      console.log(action.payload)
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case EDIT_PRODUCT:
      console.log(action.payload)
      return {
        ...state,
        data: state.data.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case DELETE_PRODUCT:
      console.log(action.payload)
      return {
        ...state,
        data: state.data.filter((product) => product.id !== action.payload),
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case FETCH_USERS_FAILURE: 
      return {
         ...state,
         error: action.payload
      }
    default:
      return state;
  }
};

export default productReducer;

// const initialState = {
//     products: []
// }

// const productReducer = (state = initialState, action) => {
//     switch(action.type){
//         case ADD_PRODUCT :
//             return {
//                 ...state,
//                 products: [...state.products, action.payload]
//             }
//         case EDIT_PRODUCT :
//             return {
//                 ...state,
//                 products: state.products.map(product => product.id === action.payload.id ? action.payload : product)
//             }
//         case DELETE_PRODUCT :
//             return {
//                 ...state,
//                 products: state.products.filter(product => product.id !== action.payload)
//             }
//         default: return state
//     }
// };

// export default productReducer;
