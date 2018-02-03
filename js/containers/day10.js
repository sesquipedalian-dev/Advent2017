import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

const circularListLength = 256;
const knotRounds = 64;

class Day10 extends Component {
    back() { 
        Actions.pop();
    } 

    knotHash(lengths, _currentPos, _skipSize, _circularList) { 
        var circularList = _circularList; 
        if(circularList === undefined) { 
            circularList = [];
            for(var i = 0; i < circularListLength; i++) { 
                circularList.push(i);
            }
        }
        
        var skipSize = _skipSize || 0; 
        var currentPos = _currentPos || 0;

        lengths.forEach(length => { 
            // 1 - reverse all elements in the list from currentPos to length (exclusive)
            for(var i = 0; i < Math.floor(length / 2); i++) { 
                // swap currentPos + i and currentPos + length - i -1
                const swap = circularList[(currentPos + i) % circularListLength];
                circularList[(currentPos + i) % circularListLength] = 
                    circularList[(currentPos + length - i - 1) % circularListLength];
                circularList[(currentPos + length - i - 1) % circularListLength] = swap;
            }

            // 2 - move currentPos to the length plus skipSize
            currentPos = currentPos + length + skipSize;

            // 3 - increase the skip size 
            skipSize++;
        });

        return [circularList, currentPos, skipSize, circularList];
    }

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            const lengths = input1.split(/\s*,\s*/).map(str => parseInt(str));
            const circularList = this.knotHash(lengths);

            // output the multiple of the first two numbers in the list after
            // the preceding crazy algorithm is done
            this.props.setDay10Output1(circularList[0][0] * circularList[0][1]);
            // 8536
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
            // calculate lengths list by taking ASCII code of characters
            // and converting to an int.  ASCII codes should be < 256
            const lengths = input1.split('').map(char => char.charCodeAt(0));

            // add a sequence of special lengths to the lengths list
            [17, 31, 73, 47, 23].forEach(l => lengths.push(l));

            // run 64 rounds of the hash, tracking the currentPos and skiplength 
            // through all of those
            var currentPos; 
            var skip;
            var sparseHash;
            for(var i = 0; i < knotRounds; i++) { 
                const result = this.knotHash(lengths, currentPos, skip, sparseHash);
                currentPos = result[1];
                skip = result[2];
                sparseHash = result[3];
            }

            // reduce the sparse hash to a dense hash by taking an XOR over each 
            // 16 digit block of numbers in the sparseHash
            // TODO do we need a const for the 'magic number' 16? 
            var denseHash = [];
            for(var block = 0; block < 16; block++) { 
                var sum = sparseHash[block * 16];
                for(var i = 1; i < 16; i++) { 
                    sum = sum ^ sparseHash[(block * 16) + i];
                }
                denseHash.push(sum);
            }

            // lastly, convert to hexadecimal for output 
            const result = denseHash.reduce((soFar, next) => { 
                var thisValue = next.toString(16); 
                if(thisValue.length < 2) { 
                    thisValue = '0' + thisValue;
                }
                return soFar + thisValue;
            }, "");

            this.props.setDay10Output2(result);
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
                    Part 1: partial list reversal
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay10Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    More complicated algorithm - hashing a given ASCII string to 
                    generate lengths in the knot hash
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

export default comp = defineView(Day10, (state) => {
    return { 
        input1: state.day10Input1, 
        output1: state.day10Output1,
        output2: state.day10Output2,
    }
});