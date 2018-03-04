import {cont, pause, halted} from './RetVals';

export default class Assembly { 
    constructor(instructions, programID) { 
        this.registers = {p: programID};
        this.lastSound = undefined;
        this.lastSoundRecovered = undefined;
        this.instructionPointer = 0;
        this.instructions = instructions;
        this.queue = [];
        this.sendCount = 0;
        this.instructionCounts = new Map();
    }

    incrementSendCount() { 
        this.sendCount++;
    }

    getSendCount() { 
        return this.sendCount;
    }

    setOtherAssembly(assembly) { 
        this.otherAssembly = assembly;
    }

    getOtherAssembly() { 
        return this.otherAssembly;
    }

    run() { 
        while(this.processNextInstruction() != halted);
    }

    getInstructionCount(name) { 
        return this.instructionCounts.get(name) || 0;
    }

    processNextInstruction() { 
        var retVal; 
        const canRun =
            (0 <= this.instructionPointer) &&
            (this.instructionPointer < this.instructions.length) && 
            (!this.lastSoundRecovered)
        
        if(canRun) { 
            const currentInstruction = this.instructions[this.instructionPointer];
            //console.log("iterate ", currentInstruction, this, this.instructionPointer, this.getRegister("a"));
            retVal = this.processInstruction(currentInstruction);
            this.instructionPointer++;               
        } else { 
            retVal = halted;
        }
        return retVal;
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
        var retVal = cont;
        const instructionRegex = /^(\w+) (\w+)( ([-\w]+))?/;
        const match = instructionRegex.exec(instruction); 

        if(match != null) { 
            const instructionName = match[1];
            const firstArg = match[2];
            const secondArg = match[4];

            const selectedInstruction = allInstructions.find(i => i.name == instructionName);
            if(selectedInstruction) { 
                retVal = selectedInstruction.process(this, firstArg, secondArg);
                this.instructionCounts.set(selectedInstruction.name, 
                    (this.instructionCounts.get(selectedInstruction.name) || 0) + 1
                );
            }
        }

        return retVal;
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