import { CHANGE_ITEM_FIELD, LOAD_ITEM, CLEAR_DATA} from "../actions/actionTypes";

const initialState = {
    itemState: 'idle',
    data: {
        name: '',
        price: '',
        id: null,
        content: ''
    }
};

export default function editItemReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_ITEM_FIELD:
            let {name, value} = action.payload;
            return {...state, data: {...state.data, [name]: value}};
        case LOAD_ITEM: 
            return {...action.payload}
        case CLEAR_DATA:
            return {...initialState}
        default:
            return state;
    }
}