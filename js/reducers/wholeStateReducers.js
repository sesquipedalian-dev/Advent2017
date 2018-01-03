// example of a reducer over the whole state.  Takes the state and an action
// changing the state, and maps it to a new state.  This is after any
// 'simple reducers' have already had their turn, so you can look at the state
// they've generated and either tweak it or make new state dependent on that.
 
export const aSecondInt = function(state, action) {
    return { 
        ...state, 
        aSecondInt: state.anInt * 2
    };
}