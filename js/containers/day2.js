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
            var curInt = '';
            var sum = 0; 
            var highestRow = Number.MIN_SAFE_INTEGER;
            var lowestRow = Number.MAX_SAFE_INTEGER;
            for(var i = 0; i < input1.length; i++) {
                const char = input1.substr(i, 1); 
                switch(char) { 
                    case '\t':
                        const curVal = parseInt(curInt); 
                        curInt = ''; 
                        if(curVal > highestRow) { 
                            highestRow = curVal;
                        } 
                        if(curVal < lowestRow) { 
                            lowestRow = curVal;
                        }
                        break;
                    case '\r':
                    case '\l':
                    case '\n':
                        // handle last value in row
                        const curVal1 = parseInt(curInt); 
                        curInt = ''; 
                        if(curVal1 > highestRow) { 
                            highestRow = curVal1;
                        } 
                        if(curVal1 < lowestRow) { 
                            lowestRow = curVal1;
                        }
                        
                        // handle row change
                        sum += (highestRow - lowestRow);
                        console.log("row change (" + highestRow + ") - (" + lowestRow + ") = (" + sum + ")");
                        highestRow = Number.MIN_SAFE_INTEGER;
                        lowestRow = Number.MAX_SAFE_INTEGER;
                        curInt = '';
                        break;
                    case '0':
                    case '1': 
                    case '2': 
                    case '3': 
                    case '4': 
                    case '5': 
                    case '6': 
                    case '7': 
                    case '8': 
                    case '9':
                        curInt = curInt.concat(char);
                        break;
                    default:
                        break;
                }
            }

            sum += (highestRow - lowestRow);
            console.log("last row change (" + highestRow + ") - (" + lowestRow + ") = (" + sum + ")");
           
            this.props.setDay2Output1(sum);
        }
    }

    render() {
        var output1Value = '...';
        if(this.props.output1 !== undefined) { 
            output1Value = this.props.output1;
        } 

        return (
            <View>
                <Text>Part 1: Calculate 'checksum' of spreadsheet.  Each row of input (\n separated) has a tab-separated list of values.  The row's sum is the difference between the highest and lowest value.</Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay2Input1(text)}
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

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
        input1: state.day2Input1, 
        output1: state.day2Output1,
    }
});