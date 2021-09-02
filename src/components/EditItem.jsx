import { changeItemField, clearData, fetchItem, submitItem } from '../actions/actionCreators';
import { connect } from 'react-redux';
import { useSelector, useDispatch} from 'react-redux';
import React, { useEffect } from 'react';

function EditItem(props) {

    const {data, itemState} = useSelector(state => state.editItem);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchItem(props.match.params.id))
    }, [dispatch, props.match.params.id])

    const handleChange = ev => { 
        const {name, value} = ev.target;
        props.onChange(name,value)
    }

    const handleSubmit = ev => { 
        ev.preventDefault();
        const {name, price, content, id} = props.item.data;
        props.onEdit(name, price, content, id)
    }

    const handleBack = ev => { 
        ev.preventDefault();
        props.onCancel();
        props.history.goBack();

    }

    const loading = (itemState === 'loading')

return ( 
    
    <React.Fragment>
    {(!data && loading) && 
        <div className="loading">Loading..</div>
    }
    {data &&
      <form onSubmit={handleSubmit} className="item">
        <h2>Edit service</h2>
        <label htmlFor="name">Name</label><input name="name" onChange={handleChange} value={data.name} disabled={loading} required/>
        <label htmlFor="price">Price</label><input name="price" onChange={handleChange} value={data.price} type="number" disabled={loading} required/>
        <label htmlFor="content">Description</label><textarea name="content" onChange={handleChange} value={data.content} disabled={loading} required/>
        <div>
            <button type="submit" onClick={handleSubmit} disabled={loading}  className={`submit-button ${loading && "loading"}`}>
                <div className="button-text">Save</div>
            </button>
            <button type="reset" onClick={handleBack} disabled={loading} className="cancel-button">Back</button>
        </div>
        
    </form>
    }
    
    {itemState.startsWith('error') &&
        <div className="error">{itemState}</div>
    }
    </React.Fragment>
)
}

const mapStateToProps = (state) => {
    const { editItem } = state;
    return {item: editItem};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchItem: (id) => {
            dispatch(fetchItem(id))
        },
        onChange: (name, value) => dispatch(changeItemField(name, value)),
        onEdit: (name, price, content, id) => {
            dispatch(submitItem({name,price,content,id}))
        },
        onCancel: () => dispatch(clearData())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItem)

