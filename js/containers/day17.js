import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

const LAST_VALUE = 2017;
class Day17 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            const elements = [0];
            var currentPosition = -1;
            const skipNum = parseInt(input1);
            var currentInput = 0;

            while(currentInput < LAST_VALUE) { 
                currentPosition++;
                currentInput++;

                // move position
                currentPosition = (currentPosition + skipNum) % elements.length;

                // insert current input after that position
                elements.splice(currentPosition + 1, 0, currentInput); 

                console.log("step ", currentInput, currentPosition, elements);
            }

            const nextElem = elements[(currentPosition + 2) % elements.length];
            
            this.props.setDay17Output1(nextElem);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
                        
            this.props.setDay17Output2('');
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
                    Spin lock algorithm
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay17Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    YYY
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

export default comp = defineView(Day17, (state) => {
    return { 
        input1: state.day17Input1, 
        output1: state.day17Output1,
        output2: state.day17Output2,
    }
});