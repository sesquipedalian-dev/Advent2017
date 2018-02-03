import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

const supportedConditionals = new Map([
    [">", function(val, compareTo) { return val > compareTo; }],
    ["<", function(val, compareTo) { return val < compareTo; }],
    [">=", function(val, compareTo) { return val >= compareTo; }],
    ["<=", function(val, compareTo) { return val <= compareTo; }],
    ["==", function(val, compareTo) { return val == compareTo; }],
    ["!=", function(val, compareTo) { return val != compareTo; }],
]);

const supportedModifiers = new Map([
    ["inc", function(registerVal, amt) { return registerVal + amt; }], 
    ["dec", function(registerVal, amt) { return registerVal - amt; }],
]);

class RegisterProg {
    constructor() { 
        this.registers = new Map();
        this.highestValue = undefined;
    }

    static get getSupportedConditionals() { return Array.from(supportedConditionals.keys()); }
    static get getSupportedModifiers() { return Array.from(supportedModifiers.keys()); }

    getHighestValue() { 
        return this.highestValue;
    }

    checkCondition(registerName, op, compare) { 
        var retVal = false;
        const compareInt = parseInt(compare);
        const currentRegisterVal = this.registers.get(registerName) || 0;
        
        const evalFunc = supportedConditionals.get(op);
        if(evalFunc !== undefined) { 
            retVal = evalFunc(currentRegisterVal, compareInt);
        }
        return retVal;
    }

    updateRegister(registerName, op, amt) { 
        const compareInt = parseInt(amt);
        const currentRegisterVal = this.registers.get(registerName) || 0;
        
        const evalFunc = supportedModifiers.get(op);
        if(evalFunc !== undefined) { 
            const updatedVal = evalFunc(currentRegisterVal, compareInt);
            this.registers.set(registerName, updatedVal);
            if(this.highestValue === undefined || this.highestValue < updatedVal) { 
                this.highestValue = updatedVal;
            }
        }
    }

    getMaxRegisterValue() { 
        const array = Array.from(this.registers.values());
        var retVal = array.shift();
        array.forEach(registerValue => {
            if(registerValue > retVal) { 
                retVal = registerValue; 
            }
        });
        return retVal;
    }
}

class Day8 extends Component {
    back() { 
        Actions.pop();
    } 

    handleInput(input) { 
        const lines = input.split(/[\r\n]/);
        const registerProg = new RegisterProg(); 
        const regexStr =  // example: b inc 5 if a > 1
            '([a-zA-Z]+)\\s+' + // match the register name for modify
            '(' + RegisterProg.getSupportedModifiers.join('|') + ')\\s+' + // match the change operation
            '(-?\\d+)\\s+' + // match the amount to modify
            'if\\s+' + 
            '([a-zA-Z]+)\\s+' + // match the register name for conditional
            '(' + RegisterProg.getSupportedConditionals.join('|') + ')\\s+' + // match the conditional op
            '(-?\\d+)' // match the comparison value against the register
            ;
        const lineRegex = new RegExp(regexStr);
        console.log("constructing regex from str:", regexStr, lineRegex);

        lines.forEach(line => { 
            const match = lineRegex.exec(line);
            console.log("parsing line:", line, match);
            if(match !== undefined && registerProg.checkCondition(match[4], match[5], match[6])) { 
                registerProg.updateRegister(match[1], match[2], match[3]);
            }
        });

        return registerProg;
    }

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            const registerProg = this.handleInput(input1);

            const result = registerProg.getMaxRegisterValue();
            
            this.props.setDay8Output1(result);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
            const registerProg = this.handleInput(input1);
            
            const result = registerProg.getHighestValue();
                        
            this.props.setDay8Output2(result);
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
                    Handle a simple programming language that increments register values conditionally
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay8Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    Part 2: find the highest value that was ever in a register while the program was running.
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

export default comp = defineView(Day8, (state) => {
    return { 
        input1: state.day8Input1, 
        output1: state.day8Output1,
        output2: state.day8Output2,
    }
});