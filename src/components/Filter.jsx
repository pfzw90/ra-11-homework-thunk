import { changeFilter, clearFilter } from '../actions/actionCreators';
import { connect } from 'react-redux';

function Filter(props) {

    const handleChange = ev => { 
        const {value} = ev.target;
        props.onChange(value)
    }

    const handleClear = ev => { 
        ev.preventDefault()
        props.onClear()
    }

    return ( 
    <form className="filter">
        <input name='namefilter' onChange={handleChange} value={props.filter.value} />
        <button type="reset" onClick={handleClear} className="cancel-button">Clear</button>
    </form>
    )
}

const mapStateToProps = (state) => {
    const { filter } = state;
    return { filter : filter };
}

const mapDispatchToProps = (dispatch, ownProps) => {
return {
    onChange: (value) => dispatch(changeFilter(value)),
    onClear: () => dispatch(clearFilter())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
