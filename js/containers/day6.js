import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class Day6 extends Component {
    back() { 
        Actions.pop();
    } 

    solve(input) { 
        var currentArr = input.split(/\s+/).map(num => parseInt(num));
        const seen = new Map([]);
        var steps = 0;
        const maxSteps = 1000000000 ;
        while(
            (steps < maxSteps) && 
            !seen.get(currentArr.join(','))
        ) { 
            // mark this particular string as 'seen', so we can detect the loop
            seen.set(currentArr.join(','), steps); 

            // find the highest block in the array
            var maxIndex = undefined;
            for(var arrI = 0; arrI < currentArr.length; arrI++) { 
                if(
                    (maxIndex === undefined) || 
                    (currentArr[arrI] > currentArr[maxIndex])
                 ) { 
                    maxIndex = arrI;
                }
            }

            // set up the blocks to distribute
            var currentToDistribute = currentArr[maxIndex];
            currentArr[maxIndex] = 0;

            // distribute the blocks
            for(
                arrI = (maxIndex + 1) % currentArr.length;
                currentToDistribute > 0;
                currentToDistribute--, arrI = (arrI + 1) % currentArr.length
            ) { 
               currentArr[arrI] += 1; 
            }
            
            steps++;
        }

        return [steps, seen.get(currentArr.join(','))];
    }

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            const result = this.solve(input1);
            this.props.setDay6Output1(result[0]);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);

            const result = this.solve(input1);
            this.props.setDay6Output2(result[0] - result[1]);
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
                    number bank reordering
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay6Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    Part 2: ???
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

export default comp = defineView(Day6, (state) => {
    return { 
        input1: state.day6Input1, 
        output1: state.day6Output1,
        output2: state.day6Output2,
    }
});