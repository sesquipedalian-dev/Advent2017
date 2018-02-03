import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

const directionMap = new Map([
    ['n' , [ 1,  0, -1]], // positive x, negative z
    ['ne', [ 1, -1,  0]], // positive x, negative y 
    ['se', [ 0, -1,  1]], // positive z, negative y
    ['s' , [-1,  0,  1]], // positive z, negative x
    ['sw', [-1,  1,  0]], // positive y, negative x
    ['nw', [ 0,  1, -1]], // positive y, negative z
]);

class Day11 extends Component {
    back() { 
        Actions.pop();
    } 

    manhattanDistance(position) { 
        // find the manhattan distance equivalent to the origin from currentPos
        return position.reduce((sofar, next) => { 
            return sofar + Math.abs(next);
        }, 0) / 2;
    }

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            var currentPos = [0, 0, 0];

            // move us to the desired position
            const moves = input1.split(/\s*,\s*/);  
            moves.forEach(move => { 
                const direction = directionMap.get(move);
                for(var i = 0; i < 3; i++) { 
                    currentPos[i] = currentPos[i] + direction[i];
                }
            });

            // find the manhattan distance equivalent to the origin from currentPos
            const distance = this.manhattanDistance(currentPos);
            
            this.props.setDay11Output1(distance);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
            
            var currentPos = [0, 0, 0];
            var highestDistance;
            
            // move us to the desired position
            const moves = input1.split(/\s*,\s*/);  
            moves.forEach(move => { 
                const direction = directionMap.get(move);
                for(var i = 0; i < 3; i++) { 
                    currentPos[i] = currentPos[i] + direction[i];
                }

                if(highestDistance === undefined) { 
                    highestDistance = this.manhattanDistance(currentPos); 
                } else { 
                    const distance = this.manhattanDistance(currentPos);
                    if(distance > highestDistance) { 
                        highestDistance = distance;
                    }
                }
            });

            this.props.setDay11Output2(highestDistance);
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
                    Part 1: Find hex grid manhattan distance after a number of moves to find 
                    the target coordinate.
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay11Input1(text)}
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

export default comp = defineView(Day11, (state) => {
    return { 
        input1: state.day11Input1, 
        output1: state.day11Output1,
        output2: state.day11Output2,
    }
});