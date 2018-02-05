import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

const generatorAFactor = 16807;
const generatorBFactor = 48271;
const divisor = 2147483647; // max signed int!!  but I guess javascript numbers are 64-bit floats, so A-OK

class Day15 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);

            const generationsToCheck = 40000000;
           
            const generatorStartingNums = input1.match(/(\d+)/g);
            var generatorANum = generatorStartingNums[0];
            var generatorBNum = generatorStartingNums[1];

            var matchesCount = 0;
            for(var i = 0; i < generationsToCheck; i++) { 
                generatorANum = (generatorANum * generatorAFactor) % divisor;
                generatorBNum = (generatorBNum * generatorBFactor) % divisor;
                if((generatorANum & 0xffff) == (generatorBNum & 0xffff)) { 
                    matchesCount++;
                }
            }
            
            this.props.setDay15Output1(matchesCount);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
            const generatorAEven = 4;
            const generatorBEven = 8;
            const generationsToCheck = 5000000;

            const generatorStartingNums = input1.match(/(\d+)/g);
            var generatorANum = generatorStartingNums[0];
            var generatorBNum = generatorStartingNums[1];

            var matchesCount = 0; 
            for(var i = 0; i < generationsToCheck; i++) { 
                do { 
                    generatorANum = (generatorANum * generatorAFactor) % divisor;
                } while((generatorANum % generatorAEven) != 0)

                do { 
                    generatorBNum = (generatorBNum * generatorBFactor) % divisor;
                } while((generatorBNum % generatorBEven) != 0) 

                if((generatorANum & 0xffff) == (generatorBNum & 0xffff)) { 
                    matchesCount++;
                }
            }
                        
            this.props.setDay15Output2(matchesCount);
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
                    Two number generators use some algorithm to set a value, 
                    check how often they match in the lowest 16 bits.
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay15Input1(text)}
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

export default comp = defineView(Day15, (state) => {
    return { 
        input1: state.day15Input1, 
        output1: state.day15Output1,
        output2: state.day15Output2,
    }
});