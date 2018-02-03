import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

const states = { 
    continue: 0, 
    cancel: 1, 
    garbage: 2
}
class Day9 extends Component {
    back() { 
        Actions.pop();
    }   

    parse(input) { 
        const chars = input.split('');
        var state = states.continue;

        var currentDepth = 0;
        var totalScore = 0;
        var garbageCount = 0;
        chars.forEach(char => { 
            if(state == states.cancel) {
                state = states.garbage;
            } else if(state == states.garbage) { 
                switch(char) { 
                    case '!': 
                        state = states.cancel; 
                        break;
                    case '>': 
                        state = states.continue;
                        break;
                    default: 
                        garbageCount++;
                }
            } else { 
                switch(char) { 
                    case '<': 
                        state = states.garbage;
                        break;
                    case '{': 
                        currentDepth++;
                        break;
                    case '}': 
                        totalScore += currentDepth;
                        currentDepth--;
                        break;
                }
            }
        });

        return [totalScore, garbageCount];
    }

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            const retVal = this.parse(input1);
            
            this.props.setDay9Output1(retVal[0]);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
            const retVal = this.parse(input1);

            this.props.setDay9Output2(retVal[1]);
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
                    Part 1 - parse matching delimters and calculate group depth.
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay9Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    Part 2 - count the garbage characters found in the input
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

export default comp = defineView(Day9, (state) => {
    return { 
        input1: state.day9Input1, 
        output1: state.day9Output1,
        output2: state.day9Output2,
    }
});