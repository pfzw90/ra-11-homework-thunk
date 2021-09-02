import { CHANGE_ITEM_FIELD, CLEAR_DATA, LOAD_ITEM} from "../actions/actionTypes";

const initialState = {
    itemState: 'idle',
    data: {
        name: '',
        price: '',
        id: 0,
        content: ''
    }
};

export default function addItemReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_ITEM_FIELD:
            let {name, value} = action.payload;
            return {...state, data: {...state.data, [name]: value}};
        case CLEAR_DATA:
            return {...initialState}
        case LOAD_ITEM: 
            return {...action.payload}
        default:
            return state;
    }
}