import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class State { 
    constructor(instructions) {
        this.instructions = instructions;
    }

    do(tm) { 
        const instruction = this.instructions[tm.current()];
        if(instruction) { 
            instruction(tm);
        }
    }
}

class TuringMachine {
    constructor(states) { 
        this.values = new Map(); 
        this.position = 0;
        this.states = states;
        this.currentState = states[0];
    }

    iterate(steps) { 
        for(var i = 0; i < steps; i++) { 
            this.currentState.do(this);
        }
    }

    get(i) { 
        return this.values.get(i) || 0;
    }

    current() { 
        return this.get(this.position);
    }

    write(v) { 
        this.set(this.position, v);
    }

    set(i, v) { 
        this.values.set(i, v);
    }

    right() { 
        this.position += 1;
    }

    left() { 
        this.position -= 1;
    }
}

class Day25 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
        
            const lines = input1.split(/[\r\n]/);
            var parseState = 'start';
            var initialState;
            var steps;
            var currentStateName;
            var currentInstructionInput;
            var currentInstructionWrite;
            var currentInstructionMove;
            var currentInstructionNextState;
            var currentInstructions;
            var states = [];
            // put extra empty line at end!
            while(lines.length > 0) { 
                var currentLine = lines.shift();
                switch(parseState) { 
                    case 'start': {
                        const m = currentLine.match(/Begin in state (\w)/);
                        if(m) { 
                            const statename = m[1];
                            initialState = statename.charCodeAt(0) - 65;
                            parseState = 'checksum';
                        }
                        break;
                    }
                    case 'checksum': { 
                        const m = currentLine.match(/Perform a diagnostic.* (\d+) steps/);
                        if(m) { 
                            steps = parseInt(m[1]);
                            parseState = 'lookForState';
                        }
                        break;
                    }
                    case 'lookForState': {
                        const m = currentLine.match(/In state (\w+)/);
                        if(m) { 
                            currentStateName = m[1];
                            parseState = 'inState';
                            currentInstructions = [];
                        }
                        break;
                    }
                    case 'inState': { 
                        const m = currentLine.match(/If the current value is (\d)/);
                        if(m) { 
                            currentInstructionInput = m[1];
                            parseState = 'inInstruction';
                        }
                        break;
                    }
                    case 'inInstruction': { 
                        var m = currentLine.match(/If the current value is (\d)/);
                        if(m) { 
                            // finish up 'in instruction'
                            const writeAlias = currentInstructionWrite;
                            const moveAlias = currentInstructionMove;
                            const nextStateAlias = currentInstructionNextState;
                            currentInstructions.push(function(tm) { 
                                tm.write(writeAlias);
                                moveAlias(tm);
                                tm.currentState = tm.states[nextStateAlias];
                            });

                            currentInstructionInput = m[1];
                        }

                        m = currentLine.match(/^\s*$/);
                        if(m) { 
                            // finish up 'in instruction'
                            const writeAlias = currentInstructionWrite;
                            const moveAlias = currentInstructionMove;
                            const nextStateAlias = currentInstructionNextState;
                            currentInstructions.push(function(tm) { 
                                tm.write(writeAlias);
                                moveAlias(tm);
                                tm.currentState = tm.states[nextStateAlias];
                            });

                            // finish up 'in state'
                            states.push(new State(currentInstructions));

                            parseState = 'lookForState';
                        }

                        m = currentLine.match(/Write the value (\d)/); 
                        if(m) { 
                            currentInstructionWrite = parseInt(m[1]);
                        }

                        m = currentLine.match(/Move one slot to the (\w+)/);
                        if(m) { 
                            const moveString = m[1];
                            if(moveString == "left") {
                                currentInstructionMove = function(tm) { tm.left() };
                            } else if (moveString == "right") { 
                                currentInstructionMove = function(tm) { tm.right() };
                            }
                        }

                        m = currentLine.match(/Continue with state (\w+)/);
                        if(m) { 
                            currentInstructionNextState = m[1].charCodeAt(0) - 65;
                        }
                    }
                    default:
                }
            }

            const tape = new TuringMachine(states, steps);
            tape.iterate(steps);

            var count = 0;
            for(var[k, v] of tape.values) { 
                if(v == 1) { 
                    count++;
                }
            }
            
            this.props.setDay25Output1(count);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
                        
            this.props.setDay25Output2('');
        }
    }

    render() {
        var output1Value = '...';
        if(this.props.output1 !== undefined) { 
            output1Value = this.props.output1;
        } 

        var output2Value = '...';
        if(this.props.output2 !== undefined) { 
            output2Value = this.props.output2;
        } 

        return (
            <ScrollView>
                <Text>
                    TURING machine program
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay25Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    YYY
                </Text>
                <Button 
                    onPress={this.solveInput2.bind(this)}
                    title='Solve!'
                />
                <Text>{output2Value}</Text>

                <Button
                    onPress={this.back.bind(this)}
                    title='go back to landing scene'
                />
            </ScrollView>
        );
    }
}

export default comp = defineView(Day25, (state) => {
    return { 
        input1: state.day25Input1, 
        output1: state.day25Output1,
        output2: state.day25Output2,
    }
});