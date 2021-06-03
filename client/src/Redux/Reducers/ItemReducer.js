const initialState = {
    items: []
};

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ITEMS":
            return {
                ...state,
                items: action.payload
            };
        case "ADD_ITEM":
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case "UPDATE_ITEM":
            for (let item of state.items) {
                if (item._id === action.payload.id) {
                    item.name = action.payload.name;
                }
            }
            return {
                ...state,
            }
        case "DELETE_ITEM":
            return {
                ...state,
                items: state.items.filter((item) => item._id !== action.payload)
            };
        default:
            return state;
    }
}

export default itemReducer;