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

export function setDay1Input1(input) { 
    return { 
        type: types.DAY1_INPUT1,
        input
    };
}

export function setDay1Output1(output) { 
    return { 
        type: types.DAY1_OUTPUT1,
        output
    };
}

export function setDay1Input2(input) { 
    return { 
        type: types.DAY1_INPUT2,
        input
    };
}

export function setDay1Output2(output) { 
    return { 
        type: types.DAY1_OUTPUT2, 
        output
    };
}

export function setDay2Input1(input) { 
    return { 
        type: types.DAY2_INPUT1, 
        input
    };
}

export function setDay2Output1(output) { 
    return { 
        type: types.DAY2_OUTPUT1, 
        output
    };
}

export function setDay2Output2(output) { 
    return {
        type: types.DAY2_OUTPUT2, 
        output
    };
}

export function setDay3Input1(input) { 
    return { 
        type: types.DAY3_INPUT1, 
        input
    };
}

export function setDay3Output1(output) { 
    return { 
        type: types.DAY3_OUTPUT1, 
        output
    };
}

export function setDay3Output2(output) { 
    return { 
        type: types.DAY3_OUTPUT2, 
        output
    };
}

export function setDay4Input1(input) { 
    return { 
        type: types.DAY4_INPUT1,
        input
    };
}

export function setDay4Output1(output) { 
    return { 
        type: types.DAY4_OUTPUT1, 
        output
    };
}

export function setDay4Output2(output) { 
    return { 
        type: types.DAY4_OUTPUT2,
        output
    };
}

export function setDay5Input1(input) { 
    return { 
        type: types.DAY5_INPUT1, 
        input
    };
}

export function setDay5Output1(output) { 
    return { 
        type: types.DAY5_OUTPUT1, 
        output
    };
}

export function setDay5Output2(output) { 
    return { 
        type: types.DAY5_OUTPUT2, 
        output
    };
}

export function setDay6Input1(input) { 
    return { 
        type: types.DAY6_INPUT1,
        input
    };
}

export function setDay6Output1(output) { 
    return { 
        type: types.DAY6_OUTPUT1, 
        output
    };
}

export function setDay6Output2(output) { 
    return { 
        type: types.DAY6_OUTPUT2, 
        output
    };
}

export function setDay7Input1(input) { 
    return { 
        type: types.DAY7_INPUT1, 
        input
    };
}

export function setDay7Output1(output) { 
    return { 
        type: types.DAY7_OUTPUT1,
        output
    };
}

export function setDay7Output2(output) { 
    return { 
        type: types.DAY7_OUTPUT2, 
        output
    };
}

export function setDay8Input1(input) { 
    return { 
        type: types.DAY8_INPUT1, 
        input
    };
}

export function setDay8Output1(output) { 
    return { 
        type: types.DAY8_OUTPUT1,
        output
    };
}

export function setDay8Output2(output) { 
    return { 
        type: types.DAY8_OUTPUT2, 
        output
    };
}

export function setDay9Input1(input) { 
    return { 
        type: types.DAY9_INPUT1, 
        input
    };
}

export function setDay9Output1(output) { 
    return { 
        type: types.DAY9_OUTPUT1,
        output
    };
}

export function setDay9Output2(output) { 
    return { 
        type: types.DAY9_OUTPUT2, 
        output
    };
}

export function setDay10Input1(input) { 
    return { 
        type: types.DAY10_INPUT1, 
        input
    };
}

export function setDay10Output1(output) { 
    return { 
        type: types.DAY10_OUTPUT1,
        output
    };
}

export function setDay10Output2(output) { 
    return { 
        type: types.DAY10_OUTPUT2, 
        output
    };
}

export function setDay11Input1(input) { 
    return { 
        type: types.DAY11_INPUT1, 
        input
    };
}

export function setDay11Output1(output) { 
    return { 
        type: types.DAY11_OUTPUT1,
        output
    };
}

export function setDay11Output2(output) { 
    return { 
        type: types.DAY11_OUTPUT2, 
        output
    };
}

export function setDay12Input1(input) { 
    return { 
        type: types.DAY12_INPUT1, 
        input
    };
}

export function setDay12Output1(output) { 
    return { 
        type: types.DAY12_OUTPUT1,
        output
    };
}

export function setDay12Output2(output) { 
    return { 
        type: types.DAY12_OUTPUT2, 
        output
    };
}

export function setDay13Input1(input) { 
    return { 
        type: types.DAY13_INPUT1, 
        input
    };
}

export function setDay13Output1(output) { 
    return { 
        type: types.DAY13_OUTPUT1,
        output
    };
}

export function setDay13Output2(output) { 
    return { 
        type: types.DAY13_OUTPUT2, 
        output
    };
}


export function setDay14Input1(input) { 
    return { 
        type: types.DAY14_INPUT1, 
        input
    };
}

export function setDay14Output1(output) { 
    return { 
        type: types.DAY14_OUTPUT1,
        output
    };
}

export function setDay14Output2(output) { 
    return { 
        type: types.DAY14_OUTPUT2, 
        output
    };
}