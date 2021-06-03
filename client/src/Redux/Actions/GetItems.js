import axios from 'axios';

const GET_ITEMS = "GET_ITEMS";
const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";

//Get Items
export const getItems = () => {
    return (dispatch, getState) => {
        axios.get('/api/items').then((res) => {
            dispatch({ type: GET_ITEMS, payload: res.data })
        })
    }

};

//Create item
export const addItem = item => dispatch => {
    axios
        .post('/api/items', item)
        .then(res => {
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            });
        }).catch((err) => {
            console.log(err);
        })
}

//Update Item
export const updateItem = (id, item) => {
    return (dispatch, getState) => {
        axios.patch(`/api/items/${id}`, { item });
        item.id = id;
        dispatch({ type: UPDATE_ITEM, payload: item })
    }
}

//delete item 
export const delItem = (id) => {
    return (dispatch, getState) => {
        axios.delete(`/api/items/${id}`).then(res => {
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        }).catch(err => {
            console.log(err);
        })
    }
}