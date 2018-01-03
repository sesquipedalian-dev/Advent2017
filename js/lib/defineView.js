import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';

// binds redux actions to this.props inside of our components
// e.g. this.props.changeInt(amt)
export function mapDispatchToProps(dispatch) { 
    return bindActionCreators(ActionCreators, dispatch);
}

// defines a view for a component. The view will narrow down the redux state
// to the portion of it that the component needs, to the component's this.props.
// It also helps bind the redux actions to the props.
export default function defineView(component, view) { 
    return connect((state) => { 
        return view(state);
    }, mapDispatchToProps)(component);
}