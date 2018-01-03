import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

// simple reducers - takes a slice of the state (based on the name of the reducer)
// and manages it based on actions that change the state

export const anInt = createReducer(0, { 
    [types.CHANGE_INT](state, action) { 
        return state + action.amount;
    }
});

export const day1Part1Input = createReducer('', { 
    [types.DAY1_INPUT1](state, action) { 
        return action.input;
    }
});

export const day1Output1 = createReducer(undefined, { 
    [types.DAY1_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day1Input2 = createReducer('', { 
    [types.DAY1_INPUT2](state, action) { 
        return action.input;
    }
});

export const day1Output2 = createReducer(undefined, { 
    [types.DAY1_OUTPUT2](state, action) { 
        return action.output;
    }
});