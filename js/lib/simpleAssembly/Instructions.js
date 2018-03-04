import {cont, pause, halted} from './RetVals';

class Instruction { 
    constructor(name) { 
        this.name = name;
    }

    process(assembly, firstArg, secondArg) { 
        return cont;
    }
}

export class SetInstruction extends Instruction { 
    constructor() { 
        super("set")
    }

    process(assembly, firstArg, secondArg) { 
        assembly.setRegister(firstArg, assembly.getRegisterOrLiteral(secondArg));
        return cont;
    }
}

export class AddInstruction extends Instruction { 
    constructor() { 
        super("add")
    }

    process(assembly, firstArg, secondArg) { 
        const currentRegister = assembly.getRegister(firstArg);
        assembly.setRegister(firstArg, currentRegister + assembly.getRegisterOrLiteral(secondArg));
        return cont;
    }
}

export class SendInstruction extends Instruction { 
    constructor() { 
        super("snd")
    }

    process(assembly, firstArg, secondArg) { 
        const valueToPush = assembly.getRegisterOrLiteral(firstArg);
        assembly.setLastSound(valueToPush);
        assembly.incrementSendCount();
        const other = assembly.getOtherAssembly()
        if(other) { 
            other.queue.push(valueToPush);
        }
        return cont;
    }
}

export class MultiplyInstruction extends Instruction { 
    constructor() { 
        super("mul")
    }

    process(assembly, firstArg, secondArg) { 
        const currentRegister = assembly.getRegister(firstArg); 
        assembly.setRegister(firstArg, 
            currentRegister * assembly.getRegisterOrLiteral(secondArg)
        )
        return cont;
    }
}

export class ModInstruction extends Instruction { 
    constructor() { 
        super("mod");
    }

    process(assembly, firstArg, secondArg) { 
        const currentRegister = assembly.getRegister(firstArg); 
        assembly.setRegister(firstArg, 
            currentRegister % assembly.getRegisterOrLiteral(secondArg)
        )
        return cont;
    }
}

export class RecoverInstruction extends Instruction { 
    constructor() { 
        super("rcv");
    }

    process(assembly, firstArg, secondArg) { 
        const other = assembly.getOtherAssembly()
        if(other) { 
            const nextValue = assembly.queue.shift();
            if(!nextValue) { 
                return pause;
            } else { 
                assembly.setRegister(firstArg, nextValue);
                return cont;
            }
        } else { 
            const currentRegister = assembly.getRegisterOrLiteral(firstArg); 
            if(currentRegister != 0) { 
                assembly.setLastSoundRecovered();
            }
            return cont;
        }
    }
}

export class JumpInstruction extends Instruction { 
    constructor() { 
        super("jgz");
    }

    process(assembly, firstArg, secondArg) { 
        const currentRegister = assembly.getRegisterOrLiteral(firstArg);
        if(currentRegister > 0) { 
            assembly.jump(assembly.getRegisterOrLiteral(secondArg) - 1);
        }
        return cont;
    }
}

export class SubtractInstruction extends Instruction { 
    constructor() { 
        super("sub");
    }

    process(assembly, firstArg, secondArg) { 
        const currentRegister = assembly.getRegister(firstArg);
        assembly.setRegister(firstArg, currentRegister - assembly.getRegisterOrLiteral(secondArg));
        return cont;
    }
}

export class JumpNotZeroInstruction extends Instruction { 
    constructor() { 
        super("jnz");
    }

    process(assembly, firstArg, secondArg) { 
        const currentRegister = assembly.getRegisterOrLiteral(firstArg);
        if(currentRegister != 0) { 
            assembly.jump(assembly.getRegisterOrLiteral(secondArg) - 1);
        }
        return cont;
    }
}

export default allInstructions = [
    new SetInstruction(), 
    new AddInstruction(), 
    new SendInstruction(), 
    new MultiplyInstruction(), 
    new ModInstruction(), 
    new RecoverInstruction(), 
    new JumpInstruction(), 
    new JumpNotZeroInstruction(), 
    new SubtractInstruction()
];