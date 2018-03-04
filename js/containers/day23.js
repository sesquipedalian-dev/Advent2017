import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';
import {MultiplyInstruction} from '../lib/simpleAssembly/Instructions';
import Assembly from '../lib/simpleAssembly/Assembly';

class Day23 extends Component {
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

            this.props.setDay23Output1(assembly.getInstructionCount((new MultiplyInstruction()).name));
        }
    }

    isPrime(n) { 
        // Corner cases
        if (n <= 1)  return false;
        if (n <= 3)  return true;

        // This is checked so that we can skip 
        // middle five numbers in below loop
        if (n%2 == 0 || n%3 == 0) return false;

        for (var i=5; i*i<=n; i=i+6)
            if (n%i == 0 || n%(i+2) == 0)
                return false;

        return true;
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
            var h = 0; 
            const START = 93 * 100 + 100000;
            const END = START + 17000;
            const DIVISOR = 17;
            
            // find number of non primes divisble by 17 between START and END
            for(var b = START; b <= END; b += DIVISOR) {
                if(!this.isPrime(b)) { 
                    h++;
                } 
            }
                        
            this.props.setDay23Output2(h);
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
                    Simple assembly language extensions
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay23Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    Set 1 register to a different value and find a value of a different register
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

export default comp = defineView(Day23, (state) => {
    return { 
        input1: state.day23Input1, 
        output1: state.day23Output1,
        output2: state.day23Output2,
    }
});