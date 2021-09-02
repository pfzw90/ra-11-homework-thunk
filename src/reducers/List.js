import {CHANGE_FILTER, CLEAR_FILTER, LOAD_SERVICES, REMOVE_ITEM} from '../actions/actionTypes';

const initialState = {
    items: [],
    filter: '', 
    listState: 'idle',
};

export default function ListReducer(state = initialState, action) {

    switch (action.type) {
        
        case REMOVE_ITEM:
            const {itemState} = action.payload
            if (itemState !== 'removed')
                return {...state, items: state.items.map(item => (item.id === action.payload.id) ? {...item, itemState} : item)};
            else
                return {...state, items: state.items.filter(item => (item.id !== action.payload.id))};
        case CHANGE_FILTER: 
            return {...state, filter: action.payload}
        case CLEAR_FILTER:
            return {...state, filter: ''}
        case LOAD_SERVICES:
            const {listState, data} = action.payload;
            const items = (data) ? data.map(item => {
                const itemCurrent = state.items.find(i=>i.id === item.id);
                return {...item, itemState: (itemCurrent) ? itemCurrent.itemState : 'idle'}
            }) : state.items     
            return {...state, listState, items}
        
        default:
            return state;
    }
}
