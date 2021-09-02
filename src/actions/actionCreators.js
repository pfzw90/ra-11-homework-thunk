import { EDIT_ITEM, REMOVE_ITEM, CHANGE_ITEM_FIELD, LOAD_ITEM, CLEAR_DATA, CHANGE_FILTER, CLEAR_FILTER, LOAD_SERVICES } from './actionTypes';

export function changeItem(itemState='idle', data=null) {
    return {type: EDIT_ITEM, payload: {itemState, data}};
}
export function deleteItem(itemState='idle', id) {
    return {type: REMOVE_ITEM, payload: {itemState, id}};
}
export function changeItemField(name, value) {
    return {type: CHANGE_ITEM_FIELD, payload: {name, value}}
}
export function loadItem(itemState='idle', data=null) {
    return {type: LOAD_ITEM, payload: {itemState, data}}
}
export function clearData() {
    return {type: CLEAR_DATA, payload: {}}
}
export function changeFilter(value) {
    return {type: CHANGE_FILTER, payload: value}
}
export function clearFilter() {
    return {type: CLEAR_FILTER, payload: {}}
}

export function loadServices(listState='idle', data=null) {
    return {type: LOAD_SERVICES, payload: {listState, data}}
}

export const fetchServices = () => async (dispatch, getState ) => {
    dispatch(loadServices('loading'));
        try {
        const response = await fetch(process.env.REACT_APP_SERVICES_URL)
        if (!response.ok) {
           throw new Error(response.statusText);
        }
    const data = await response.json();
    dispatch(loadServices('idle', data));
    } catch (e) {
    dispatch(loadServices(`error: ${e.message}`));
    }
}

export const fetchItem = (id) => async (dispatch, getState) => {
    dispatch(loadItem('loading'));
        try {
        const response = await fetch(process.env.REACT_APP_SERVICES_URL + id)
        if (!response.ok) {
           throw new Error(response.statusText);
        }
    const data = await response.json();
    dispatch(loadItem('idle', data));
    } catch (e) {
    dispatch(loadItem(`error: ${e.message}`));
    }
}

export const removeItem = (id) => async (dispatch, getState) => {
    dispatch(deleteItem('loading', id));
        try {
        const response = await fetch(process.env.REACT_APP_SERVICES_URL + id, {method: 'DELETE'})
        if (!response.ok) {
           throw new Error(response.statusText);
        }
    dispatch(deleteItem('removed', id));
    } catch (e) {
    dispatch(deleteItem(`error: ${e.message}`, id));
    }
}

export const submitItem = (item) => async (dispatch, getState) => {
    let error = false;
    dispatch(loadItem('loading', item));
        try {
        const response = await fetch(process.env.REACT_APP_SERVICES_URL, {method: 'POST', body: JSON.stringify(item)})
        if (!response.ok) {
           throw new Error(response.statusText);
        }
    dispatch(loadItem('idle', item));
    } catch (e) {
        error = true;
        dispatch(loadItem(`error: ${e.message}`, item));
    } finally {
    if (item.id === 0 && !error) {
        dispatch(clearData())
        dispatch(fetchServices())
    }}
}