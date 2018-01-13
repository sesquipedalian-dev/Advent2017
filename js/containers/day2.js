import React, {Component} from 'react'; 
import { View, Text, Button, TextInput } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class Day1 extends Component {
    back() { 
        Actions.pop();
    } 

    parseInput(handleInt, handleRow, done) {
        const input1 = this.props.input1;
        if(typeof input1 === 'string') { 
            var curInt = '';
            for(var i = 0; i < input1.length; i++) {
                const char = input1.substr(i, 1); 
                switch(char) { 
                    case '\t':
                        const curVal = parseInt(curInt);
                        handleInt(curVal); 
                        curInt = ''; 
                        break;
                    case '\r':
                    case '\l':
                    case '\n':
                        // handle last value in row
                        const curVal1 = parseInt(curInt); 
                        handleInt(curVal1);
                        curInt = ''; 
                        
                        // handle row change
                        handleRow();
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

            handleRow();
            done();
        }
    }

    solveInput1() { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') { 
            var sum = 0; 
            var highestRow = Number.MIN_SAFE_INTEGER;
            var lowestRow = Number.MAX_SAFE_INTEGER;
            const handleInt = function(curVal) { 
                if(curVal > highestRow) { 
                    highestRow = curVal;
                }
                if(curVal < lowestRow) { 
                    lowestRow = curVal;
                }
            }

            const handleRow = function() { 
                sum += (highestRow - lowestRow);
                console.log("row change (" + highestRow + ") - (" + lowestRow + ") = (" + sum + ")");
                highestRow = Number.MIN_SAFE_INTEGER;
                lowestRow = Number.MAX_SAFE_INTEGER;
            }

            const done = function() { 
                this.props.setDay2Output1(sum);
            }
           
            this.parseInput(handleInt, handleRow, done.bind(this));
        }
    }

    solveInput2() { 
        const input1 = this.props.input1;
        // in each row, look for a pair of numbers that are evenly divisible
        // find that even division, then add each such division to the sum
        if(typeof input1 === 'string') { 
            var sum = 0; 
            var found = false;
            var intsThisRow = [];

            const handleInt = function(curVal) { 
                if(!found) { 
                    for(var otherKey in intsThisRow) { 
                        const other = intsThisRow[otherKey];
                        var curFirst = curVal / other;
                        
                        if(curFirst == Math.floor(curFirst)) { 
                            found = true;
                            sum += curFirst;
                        } else { 
                            var otherFirst = other / curVal;
                            if(otherFirst == Math.floor(otherFirst)) { 
                                found = true;
                                sum += otherFirst;
                            }
                        }
                    }
                    intsThisRow.push(curVal);
                }
            }

            const handleRow = function() { 
                intsThisRow = [];
                if(!found) { 
                    console.log("didn't find any matching pairs this row!?");
                }
                found = false;
            }

            const done = function() { 
                this.props.setDay2Output2(sum);
            }
           
            this.parseInput(handleInt, handleRow, done.bind(this));
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

                <Text>Part 2: find pairs of evenly divisible integers in input row</Text>
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
        input1: state.day2Input1, 
        output1: state.day2Output1,
        output2: state.day2Output2,
    }
});