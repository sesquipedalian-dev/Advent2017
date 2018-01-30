import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

// TODO - this takes like 10 minutes to run for the second part >_<
// even the first part is about 1 minute
class InstructionProg { 
    constructor(progString) { 
        this.program = {};
        this.programCounter = 0; 
        const instructions = progString.split(/[\r\n]/);
        //console.log(instructions, progString);
        instructions.forEach(function(instruction) {
            const instructionVal = parseInt(instruction);
            this.program[this.programCounter++] = instructionVal;
        }, this);

        this.programSize = this.programCounter;
        this.programCounter = 0;
    }

    run() { 
        const maxSteps = 100000000;
        var steps = 0; 
        while(
            (0 <= this.programCounter) && 
            (this.programCounter < this.programSize) &&
            (steps < maxSteps)
        ) {
            const instruction = this.program[this.programCounter]; 
            //console.log("Program instruciton step: ", this.programCounter, instruction, this.programSize);
            this.incrementInstruction(instruction);
            this.programCounter += instruction;
            steps++;
        }
        return steps;
    }

    incrementInstruction() { 
        this.program[this.programCounter] += 1;
    }
}

class InstructionProg2 extends InstructionProg { 
    constructor(input) { 
        super(input);
    }

    incrementInstruction(currentVal) { 
        var addMe = 1;
        if(currentVal >= 3) { 
            addMe = -1;
        }
        this.program[this.programCounter] += addMe;
    }
}

class Day5 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
            const program = new InstructionProg(input1);
            this.props.setDay5Output1(program.run());
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
            const program = new InstructionProg2(input1);
            this.props.setDay5Output2(program.run());
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
                <Text>Part 1: look at list of jump instructions and see when list is departed</Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay5Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    Part 2: now with different rules for incrementing the current jump instruction before iterating.
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

export default comp = defineView(Day5, (state) => {
    return { 
        input1: state.day5Input1, 
        output1: state.day5Output1,
        output2: state.day5Output2,
    }
});