import React from 'react'
import { useHistory } from 'react-router'; 
import { removeItem, fetchServices} from '../actions/actionCreators';
import { connect } from 'react-redux';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import Filter from '../components/Filter'
import AddItem from './AddItem';

function List(props) {

const {items, listState, filter} = useSelector(state => state.list);
const dispatch = useDispatch();
const history = useHistory();

useEffect(() => {
    dispatch(fetchServices())
}, [dispatch])

const handleRemove = id => {props.onRemove(id)}
const handleEdit = (id) => { 
    history.push(`services/${id}`)
}

return (
    <React.Fragment>
    <AddItem/>
    <Filter/>
    {listState === 'idle' ? 
        (     
            <ul className="list">
            { items.map(o => 
                {            
                const loading = (o.itemState === 'loading')
                return (!filter.length || (filter.length && o.name.includes(filter))) ? (
                    <li key={o.id}>
                        {o.name} {o.price}
                        <div>
                            <button onClick={() => handleEdit(o.id)} disabled={loading} className="submit-button">✎</button>
                            <button onClick={() => handleRemove(o.id)} className={`cancel-button ${loading && "loading"}`} disabled={loading}>
                                <div className="button-text">🗑</div>
                            </button>
                        </div>
                        {o.itemState.startsWith('error') && <span className="error">{o.itemState}</span>}
                    </li>
                ) : null;                  
            })
            }
            </ul>
        ) : 
        ((listState === 'loading') ? (<div className="loading">Loading..</div>) : (<div className="error">{listState}</div>))       
    }
    </React.Fragment>
 )
}

const mapStateToProps = (state, ownProps) => {
    const {list: {items, listState, filter}} = state;
    return {
        list: (filter.length) ? items.filter((item) => item.name.includes(filter)) : items,
        listState
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
return {
    fetchServices: () => dispatch(fetchServices()),
    onRemove: (id) => dispatch(removeItem(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(List)

