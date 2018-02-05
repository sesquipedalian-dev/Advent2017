import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';
import {knotHash, knotHashOneIter} from '../lib/knotHash';

class Day10 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            const lengths = input1.split(/\s*,\s*/).map(str => parseInt(str));
            const circularList = knotHashOneIter(lengths);

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
 
            const result = knotHash(input1);

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