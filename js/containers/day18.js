import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class Instruction { 
    constructor(name) { 
        this.name = name;
    }

    process(assembly, firstArg, secondArg) { 

    }
}

class SetInstruction extends Instruction { 
    constructor() { 
        super("set")
    }

    process(assembly, firstArg, secondArg) { 
        assembly.setRegister(firstArg, assembly.getRegisterOrLiteral(secondArg));
    }
}

class AddInstruction extends Instruction { 
    constructor() { 
        super("add")
    }

    process(assembly, firstArg, secondArg) { 
        const currentRegister = assembly.getRegister(firstArg);
        assembly.setRegister(firstArg, currentRegister + assembly.getRegisterOrLiteral(secondArg));
    }
}

class SendInstruction extends Instruction { 
    constructor() { 
        super("snd")
    }

    process(assembly, firstArg, secondArg) { 
        assembly.setLastSound(assembly.getRegisterOrLiteral(firstArg));
    }
}

class MultiplyInstruction extends Instruction { 
    constructor() { 
        super("mul")
    }

    process(assembly, firstArg, secondArg) { 
        const currentRegister = assembly.getRegister(firstArg); 
        assembly.setRegister(firstArg, 
            currentRegister * assembly.getRegisterOrLiteral(secondArg)
        )
    }
}

class ModInstruction extends Instruction { 
    constructor() { 
        super("mod");
    }

    process(assembly, firstArg, secondArg) { 
        const currentRegister = assembly.getRegister(firstArg); 
        assembly.setRegister(firstArg, 
            currentRegister % assembly.getRegisterOrLiteral(secondArg)
        )
    }
}

class RecoverInstruction extends Instruction { 
    constructor() { 
        super("rcv");
    }

    process(assembly, firstArg, secondArg) { 
        const currentRegister = assembly.getRegisterOrLiteral(firstArg); 
        if(currentRegister != 0) { 
            assembly.setLastSoundRecovered();
        }
    }
}

class JumpInstruction extends Instruction { 
    constructor() { 
        super("jgz");
    }

    process(assembly, firstArg, secondArg) { 
        const currentRegister = assembly.getRegisterOrLiteral(firstArg);
        if(currentRegister > 0) { 
            assembly.jump(assembly.getRegisterOrLiteral(secondArg) - 1);
        }
    }
}

const allInstructions = [
    new SetInstruction(), 
    new AddInstruction(), 
    new SendInstruction(), 
    new MultiplyInstruction(), 
    new ModInstruction(), 
    new RecoverInstruction(), 
    new JumpInstruction()
];

class Assembly { 
    constructor(instructions) { 
        this.registers = {};
        this.lastSound = undefined;
        this.lastSoundRecovered = undefined;
        this.instructionPointer = 0;
        this.instructions = instructions;
    }

    run() { 
        while(
            (0 <= this.instructionPointer) &&
            (this.instructionPointer < this.instructions.length) && 
            (!this.lastSoundRecovered)
        ) { 
            const currentInstruction = this.instructions[this.instructionPointer];
            console.log("iterate ", currentInstruction, this, this.instructionPointer, this.getRegister("a"));
            this.processInstruction(currentInstruction);
            this.instructionPointer++;
        }
    }

    jump(n) { 
        this.instructionPointer += n;
    }

    getRegisterOrLiteral(arg) {
        var retVal; 
        const isLiteral = arg.match(/[-\d]/);
        if(isLiteral) { 
            retVal =  parseInt(arg);
        } else { 
            retVal = this.getRegister(arg);
        }

        return retVal;
    }

    processInstruction(instruction) {
        const instructionRegex = /^(\w+) (\w+)( ([-\w]+))?/;
        const match = instructionRegex.exec(instruction); 

        if(match != null) { 
            const instructionName = match[1];
            const firstArg = match[2];
            const secondArg = match[4];

            const selectedInstruction = allInstructions.find(i => i.name == instructionName);
            if(selectedInstruction) { 
                selectedInstruction.process(this, firstArg, secondArg);
            }
        }
    }

    setRegister(registerName, value) { 
        this.registers[registerName] = value;
    }

    getRegister(registerName) { 
        const retVal = this.registers[registerName] || 0;
        return retVal;
    }

    setLastSound(frequency) { 
        this.lastSound = frequency;
    }

    setLastSoundRecovered() { 
        this.lastSoundRecovered = this.lastSound;
    }

    getLastSoundRecovered() { 
        return this.lastSoundRecovered;
    }
}

class Day18 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            const lines = input1.split(/[\r\n]/);
            const assembly = new Assembly(lines);

            assembly.run();

            this.props.setDay18Output1(assembly.getLastSoundRecovered());
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
                        
            this.props.setDay18Output2('');
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
                    Simple assembly language
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay18Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    18
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

export default comp = defineView(Day18, (state) => {
    return { 
        input1: state.day18Input1, 
        output1: state.day18Output1,
        output2: state.day18Output2,
    }
});