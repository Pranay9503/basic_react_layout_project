import { ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../table/tableTypes.js';
import axios from "axios";

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  payload: product
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  payload: id,
});

export const fetchUsers = (data) => ({
  type: FETCH_USERS_SUCCESS,
  payload: data
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error
})

export const fetchData = () => {
  return (dispatch) => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      console.log(res.data)
      dispatch(fetchUsers(res.data));
      // return res.data
    })
    //.catch(error => dispatch(error))
  }
}