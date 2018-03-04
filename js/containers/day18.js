import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';
import {cont, pause, halted} from '../lib/simpleAssembly/RetVals';
import allInstructions from '../lib/simpleAssembly/Instructions';
import Assembly from '../lib/simpleAssembly/Assembly';

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
 
            const lines = input1.split(/[\r\n]/);
            const assembly1 = new Assembly(lines, 0);
            const assembly2 = new Assembly(lines, 1);
            assembly1.setOtherAssembly(assembly2);
            assembly2.setOtherAssembly(assembly1);

            var currentAssembly = assembly1;
            const switcharoo = function() { 
                if(currentAssembly == assembly1) { 
                    currentAssembly = assembly2;
                } else { 
                    currentAssembly = assembly1;
                }
            }

            var currentStatus = cont;
            var foundAPause = false;
            var foundHalted = false;
            while(currentStatus != halted) { 
                currentStatus = currentAssembly.processNextInstruction();
                if(currentStatus == halted) { 
                    if(foundHalted) { 
                        // both halted, terminate
                    } else { 
                        foundHalted = true;
                        currentStatus = cont;
                        switcharoo();
                    }
                } else if(currentStatus == pause) { 
                    if(foundAPause) { 
                        // both threads have halted, terminate
                        currentStatus = halted
                    } else { 
                        // if one of the threads paused, switch to the other one
                        currentAssembly.instructionPointer--;
                        switcharoo();
                        foundAPause = true;
                    }
                } else { 
                    foundAPause = false;
                }
            }

            this.props.setDay18Output2(assembly2.getSendCount());
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