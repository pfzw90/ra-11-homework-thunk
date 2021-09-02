import { changeItemField, submitItem, clearData} from '../actions/actionCreators';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import React from 'react';
import { useEffect } from 'react';

function AddItem(props) {

    const {data, itemState} = useSelector(state => state.addItem);
    const {onReset} = props;

    useEffect(() => {
        onReset();
    }, [onReset])

    const handleChange = ev => { 
        const {name, value} = ev.target;
        props.onChange(name,value)
    }

    const handleSubmit = ev => { 
        ev.preventDefault();
        const {name, price, content} = props.item.data;
        props.onEdit(name, price, content, 0);
    }

    const handleReset = (ev) => { 
        ev.preventDefault();
        props.onReset();
    }

    const loading = (itemState === 'loading')

    return ( 
    <React.Fragment>
        <form onSubmit={handleSubmit} className="item">
            <h2>Add new service</h2>
            <label htmlFor="name">Name</label><input name="name" onChange={handleChange} value={data.name} disabled={loading} required/>
            <label htmlFor="price">Price</label><input name="price" onChange={handleChange} value={data.price} type="number" disabled={loading} required/>
            <label htmlFor="content">Description</label><textarea name="content" onChange={handleChange} value={data.content} disabled={loading} required/>
            <div>
                <button type="submit" disabled={loading} className={`submit-button ${loading && "loading"}`}><div className="button-text">Add</div></button>
                <button type="reset" onClick={handleReset} disabled={loading} className="cancel-button">Clear</button>
            </div>

            {itemState.startsWith('error') &&
            <div className="error">{itemState}</div>
            }
        </form>   
    </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const { addItem } = state;
    return {item: addItem};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (name, value) => dispatch(changeItemField(name, value)),
        onEdit: (name, price, content, id) => {
            dispatch(submitItem({name,price,content,id}))
        },
        onReset: () => {
            dispatch(changeItemField('name', ''));
            dispatch(changeItemField('price', ''));
            dispatch(changeItemField('id', ''));
            dispatch(changeItemField('content', ''));
            dispatch(clearData());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)

