import * as types from './types';

// redux action constructors - methods that a component has access to on its
// this.props that let us set up a state change. 

// simple action example
export function changeInt(amount) { 
    return {
        type: types.CHANGE_INT,
        amount
    };
}

// thunk action example - the state isn't updated until after a timeout, 
// using the 'dispatch' argument (to which you may send an action for the 
// reducers to handle)
export function delayed(amount) { 
    return (dispatch, getState) => { 
        setTimeout(function() {
            dispatch({
                type: types.CHANGE_INT,
                amount
            });
        }, 5000);
    }
}