import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

const numProgs = 16;
const asciiStartsAt = 97;
const multiDances = 1000000000;

class Day16 extends Component {
    back() { 
        Actions.pop();
    } 

    doALittleDance(_progs, instructions, onMemoHitReturnInt) { 
        if(this.memo === undefined) { 
            this.memo = new Map();
        }

        const rememberedAnswer = this.memo.get(_progs.join('') + instructions.join(','));
        if(rememberedAnswer !== undefined) { 
            if(onMemoHitReturnInt) { 
                return this.memo.size;
            } else { 
                return rememberedAnswer;
            }
        } 

        const progs = _progs.slice(0);

        instructions.forEach(instruction => { 
            const swapMatch = instruction.match(/s(\d+)/);
            if(swapMatch) {
                const num = parseInt(swapMatch[1]);
                for(var j = 0; j < num; j++) { 
                    const last = progs.pop();
                    progs.unshift(last);
                }
            } else { 
                const exchangeMatch = instruction.match(/x(\w+)\/(\w+)/);
                if(exchangeMatch) { 
                    const fi = parseInt(exchangeMatch[1]); 
                    const si = parseInt(exchangeMatch[2]);
                    const s = progs[fi];
                    progs[fi] = progs[si]; 
                    progs[si] = s;
                } else { 
                    const partnerMatch = instruction.match(/p(\w+)\/(\w+)/);
                    const firstName = partnerMatch[1];
                    const secondName = partnerMatch[2];
                    var firstIndex, secondIndex; 
                    for(var j = 0; j < progs.length; j++) { 
                        if(progs[j] == firstName) { 
                            firstIndex = j;
                        } else if (progs[j] == secondName) { 
                            secondIndex = j;
                        }
                    }

                    const swap = progs[firstIndex];
                    progs[firstIndex] = progs[secondIndex]; 
                    progs[secondIndex] = swap;
                }
            }
        });

        this.memo.set(_progs.join('') + instructions.join(','), progs);
        return progs;
    }

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            var progs = [];
            for(var i = 0; i < numProgs; i++) { 
                progs.push(String.fromCharCode(asciiStartsAt + i));
            }

            const instructions = input1.split(/\s*,\s*/);

            progs = this.doALittleDance(progs, instructions, false);
            
            this.props.setDay16Output1(progs.join(''));
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
            var progs = [];
            for(var i = 0; i < numProgs; i++) { 
                progs.push(String.fromCharCode(asciiStartsAt + i));
            }

            const origProgs = progs.slice(0);
            const instructions = input1.split(/\s*,\s*/);

            this.memo = new Map();
            var cycleLength;
            while(cycleLength === undefined) { 
                const retVal = this.doALittleDance(progs, instructions, true);
                if(typeof(retVal) === 'number') { 
                    cycleLength = retVal;
                } else { 
                    progs = retVal;
                }
            }

            const actualIterations = multiDances % cycleLength;
            progs = origProgs;
            for(var i = 0; i < actualIterations; i++) { 
                progs = this.doALittleDance(progs, instructions, false);
            }

            this.props.setDay16Output2(progs.join(''));
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
                    Step 1: prancing programs
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay16Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    Part 2: Ok, now do it a billion times.
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

export default comp = defineView(Day16, (state) => {
    return { 
        input1: state.day16Input1, 
        output1: state.day16Output1,
        output2: state.day16Output2,
    }
});