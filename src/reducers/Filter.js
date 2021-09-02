import { CHANGE_FILTER, CLEAR_FILTER} from "../actions/actionTypes";

const initialState = {
    value:''
    };

export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_FILTER:
            return {value : action.payload};
        case CLEAR_FILTER:
            return initialState;
        default:
            return state;
    }
}