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

export const day2Input1 = createReducer('', { 
    [types.DAY2_INPUT1](state, action) { 
        return action.input;
    }
});

export const day2Output1 = createReducer(undefined, { 
    [types.DAY2_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day2Output2 = createReducer(undefined, { 
    [types.DAY2_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day3Input1 = createReducer('', { 
    [types.DAY3_INPUT1](state, action) { 
        return action.input;
    }
});

export const day3Output1 = createReducer(undefined, { 
    [types.DAY3_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day3Output2 = createReducer(undefined, { 
    [types.DAY3_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day4Input1 = createReducer('', { 
    [types.DAY4_INPUT1](state, action) { 
        return action.input;
    }
});

export const day4Output1 = createReducer(undefined, { 
    [types.DAY4_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day4Output2 = createReducer(undefined, { 
    [types.DAY4_OUTPUT2](state, action) { 
        return action.output;
    }
});