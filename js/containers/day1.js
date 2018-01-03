import React, {Component} from 'react'; 
import { View, Text, Button, TextInput } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class Day1 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1() { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') { 
            var sum = 0;
            const toSlide = input1.concat(input1.substr(0, 1));
            for(var i = 0; i < toSlide.length; i++) { 
                const firstChar = toSlide.substr(i, 1);
                const secondChar = toSlide.substr(i + 1, 1);
                if(firstChar == secondChar) { 
                    // add to sum
                    sum += parseInt(firstChar);
                }
            }
            this.props.setDay1Output1(sum);
        }
    }

    solveInput2() { 
        const input2 = this.props.input2;
        if(typeof input2 === 'string') { 
            var sum = 0; 
            const pivot = input2.length / 2; 
            const list1 = input2.substr(0, pivot);
            const list2 = input2.substr(pivot, pivot);
            for(var i = 0; i < pivot; i++) { 
                const char = list1.substr(i, 1);
                if(char == list2.substr(i, 1)) { 
                    const charValue = parseInt(char);
                    sum = sum + charValue + charValue; // count the match for both lists
                }
            }
            this.props.setDay1Output2(sum);
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
            <View>
                <Text>Part 1: identify number of substrings of size 2 from a string, where both characters are the same.  The last character in the string 'matches' with the first character.</Text>
                <TextInput
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay1Input1(text)}
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>Part 2: sum matching pairs for a split-in-half circular list of digits</Text>
                <TextInput
                    value={this.props.input2}
                    onChangeText={(text) => this.props.setDay1Input2(text)}
                />
                <Button
                    onPress={this.solveInput2.bind(this)}
                    title='Solve!'
                />
                <Text>{output2Value}</Text>

                <Button
                    onPress={this.back.bind(this)}
                    title='go back to landing scene'
                />
            </View>
        );
    }
}

export default comp = defineView(Day1, (state) => {
    return { 
        input1: state.day1Part1Input, 
        output1: state.day1Output1,
        input2: state.day1Input2, 
        output2: state.day1Output2
    }
});