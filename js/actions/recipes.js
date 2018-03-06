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

export function setDay15Input1(input) { 
    return { 
        type: types.DAY15_INPUT1, 
        input
    };
}

export function setDay15Output1(output) { 
    return { 
        type: types.DAY15_OUTPUT1,
        output
    };
}

export function setDay15Output2(output) { 
    return { 
        type: types.DAY15_OUTPUT2, 
        output
    };
}


export function setDay16Input1(input) { 
    return { 
        type: types.DAY16_INPUT1, 
        input
    };
}

export function setDay16Output1(output) { 
    return { 
        type: types.DAY16_OUTPUT1,
        output
    };
}

export function setDay16Output2(output) { 
    return { 
        type: types.DAY16_OUTPUT2, 
        output
    };
}

export function setDay17Input1(input) { 
    return { 
        type: types.DAY17_INPUT1, 
        input
    };
}

export function setDay17Output1(output) { 
    return { 
        type: types.DAY17_OUTPUT1, 
        output
    };
}

export function setDay17Output2(output) { 
    return { 
        type: types.DAY17_OUTPUT2, 
        output
    };
}

export function setDay18Input1(input) { 
    return { 
        type: types.DAY18_INPUT1, 
        input
    };
}

export function setDay18Output1(output) { 
    return { 
        type: types.DAY18_OUTPUT1, 
        output
    };
}

export function setDay18Output2(output) { 
    return { 
        type: types.DAY18_OUTPUT2, 
        output
    };
}

export function setDay19Input1(input) { 
    return { 
        type: types.DAY19_INPUT1, 
        input
    };
}

export function setDay19Output1(output) { 
    return { 
        type: types.DAY19_OUTPUT1,
        output
    };
}

export function setDay19Output2(output) { 
    return { 
        type: types.DAY19_OUTPUT2, 
        output
    };
}

export function setDay20Input1(input) { 
    return { 
        type: types.DAY20_INPUT1, 
        input
    };
}

export function setDay20Output1(output) { 
    return { 
        type: types.DAY20_OUTPUT1, 
        output
    };
}

export function setDay20Output2(output) { 
    return { 
        type: types.DAY20_OUTPUT2, 
        output
    };
}

export function setDay21Input1(input) { 
    return { 
        type: types.DAY21_INPUT1, 
        input
    };
}

export function setDay21Output1(output) { 
    return { 
        type: types.DAY21_OUTPUT1, 
        output
    };
}

export function setDay21Output2(output) { 
    return { 
        type: types.DAY21_OUTPUT2, 
        output
    };
}

export function setDay22Input1(input) { 
    return { 
        type: types.DAY22_INPUT1, 
        input
    };
}

export function setDay22Output1(output) { 
    return { 
        type: types.DAY22_OUTPUT1,
        output
    };
}

export function setDay22Output2(output) { 
    return { 
        type: types.DAY22_OUTPUT2, 
        output
    };
}

export function setDay23Input1(input) { 
    return { 
        type: types.DAY23_INPUT1, 
        input
    };
}

export function setDay23Output1(output) { 
    return { 
        type: types.DAY23_OUTPUT1, 
        output
    };
}

export function setDay23Output2(output) { 
    return { 
        type: types.DAY23_OUTPUT2, 
        output
    };
}

export function setDay24Input1(input) { 
    return { 
        type: types.DAY24_INPUT1, 
        input
    };
}

export function setDay24Output1(output) { 
    return { 
        type: types.DAY24_OUTPUT1, 
        output
    };
}

export function setDay24Output2(output) { 
    return { 
        type: types.DAY24_OUTPUT2, 
        output
    };
}

export function setDay25Input1(input) { 
    return { 
        type: types.DAY25_INPUT1, 
        input
    };
}

export function setDay25Output1(output) { 
    return { 
        type: types.DAY25_OUTPUT1, 
        output
    };
}

export function setDay25Output2(output) { 
    return { 
        type: types.DAY25_OUTPUT2, 
        output
    };
}