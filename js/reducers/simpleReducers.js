import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

// simple reducers - takes a slice of the state (based on the name of the reducer)
// and manages it based on actions that change the state

export const anInt = createReducer(0, { 
    [types.CHANGE_INT](state, action) { 
        return state + action.amount;
    }
});
