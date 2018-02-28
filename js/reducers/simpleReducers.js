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

export const day5Input1 = createReducer('', { 
    [types.DAY5_INPUT1](state, action) { 
        return action.input;
    }
});

export const day5Output1 = createReducer('', { 
    [types.DAY5_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day5Output2 = createReducer('', { 
    [types.DAY5_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day6Input1 = createReducer('', {
    [types.DAY6_INPUT1](state, action) { 
        return action.input;
    }
});

export const day6Output1 = createReducer(undefined, { 
    [types.DAY6_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day6Output2 = createReducer(undefined, {
    [types.DAY6_OUTPUT2](state, action) { 
        return action.output;
    }
});


export const day7Input1 = createReducer('', {
    [types.DAY7_INPUT1](state, action) { 
        return action.input;
    }
});

export const day7Output1 = createReducer(undefined, { 
    [types.DAY7_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day7Output2 = createReducer(undefined, {
    [types.DAY7_OUTPUT2](state, action) { 
        return action.output;
    }
});


export const day8Input1 = createReducer('', {
    [types.DAY8_INPUT1](state, action) { 
        return action.input;
    }
});

export const day8Output1 = createReducer(undefined, { 
    [types.DAY8_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day8Output2 = createReducer(undefined, {
    [types.DAY8_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day9Input1 = createReducer('', {
    [types.DAY9_INPUT1](state, action) { 
        return action.input;
    }
});

export const day9Output1 = createReducer(undefined, { 
    [types.DAY9_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day9Output2 = createReducer(undefined, {
    [types.DAY9_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day10Input1 = createReducer('', {
    [types.DAY10_INPUT1](state, action) { 
        return action.input;
    }
});

export const day10Output1 = createReducer(undefined, { 
    [types.DAY10_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day10Output2 = createReducer(undefined, {
    [types.DAY10_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day11Input1 = createReducer('', {
    [types.DAY11_INPUT1](state, action) { 
        return action.input;
    }
});

export const day11Output1 = createReducer(undefined, { 
    [types.DAY11_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day11Output2 = createReducer(undefined, {
    [types.DAY11_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day12Input1 = createReducer('', {
    [types.DAY12_INPUT1](state, action) { 
        return action.input;
    }
});

export const day12Output1 = createReducer(undefined, { 
    [types.DAY12_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day12Output2 = createReducer(undefined, {
    [types.DAY12_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day13Input1 = createReducer('', {
    [types.DAY13_INPUT1](state, action) { 
        return action.input;
    }
});

export const day13Output1 = createReducer(undefined, { 
    [types.DAY13_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day13Output2 = createReducer(undefined, {
    [types.DAY13_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day14Input1 = createReducer('', {
    [types.DAY14_INPUT1](state, action) { 
        return action.input;
    }
});

export const day14Output1 = createReducer(undefined, { 
    [types.DAY14_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day14Output2 = createReducer(undefined, {
    [types.DAY14_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day15Input1 = createReducer('', {
    [types.DAY15_INPUT1](state, action) { 
        return action.input;
    }
});

export const day15Output1 = createReducer(undefined, { 
    [types.DAY15_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day15Output2 = createReducer(undefined, {
    [types.DAY15_OUTPUT2](state, action) { 
        return action.output;
    }
});


export const day16Input1 = createReducer('', {
    [types.DAY16_INPUT1](state, action) { 
        return action.input;
    }
});

export const day16Output1 = createReducer(undefined, { 
    [types.DAY16_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day16Output2 = createReducer(undefined, {
    [types.DAY16_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day17Input1 = createReducer('', { 
    [types.DAY17_INPUT1](state, action) { 
        return action.input;
    }
});

export const day17Output1 = createReducer(undefined, { 
    [types.DAY17_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day17Output2 = createReducer(undefined, { 
    [types.DAY17_OUTPUT2](state, action) { 
        return action.output;
    }
});

export const day18Input1 = createReducer('', { 
    [types.DAY18_INPUT1](state, action) { 
        return action.input;
    }
});

export const day18Output1 = createReducer(undefined, { 
    [types.DAY18_OUTPUT1](state, action) { 
        return action.output;
    }
});

export const day18Output2 = createReducer(undefined, { 
    [types.DAY18_OUTPUT2](state, action) { 
        return action.output;
    }
});