import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

const namedDirection = { 
    north: {x:  0, y: -1}, 
    south: {x:  0, y:  1}, 
    east:  {x:  1, y:  0}, 
    west:  {x: -1, y:  0}
};

const directions = [
    namedDirection.north, 
    namedDirection.south, 
    namedDirection.east, 
    namedDirection.west
];

class Day22 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            const infectedMap = new Map();
            const lines = input1.split(/[\r\n]/);
            lines.forEach((l, row) => { 
                const chars = l.split('');
                chars.forEach((c, column) => {
                    if(c == '#') infectedMap.set(column + ',' + row, true);
                });
            });

            const size = lines.length;
            var position = [Math.floor(size / 2), Math.floor(size / 2)];
            var direction = namedDirection.north;
            var infectionCount = 0;

            for(var i = 0; i < 10000; i++) {
                const currentPosKey = position.join(',');
                const currentInfected = infectedMap.get(currentPosKey);
                if(currentInfected) { 
                    // turn right
                    switch(direction) { 
                        case namedDirection.north: direction = namedDirection.east; break;
                        case namedDirection.east: direction = namedDirection.south; break;
                        case namedDirection.south: direction = namedDirection.west; break;
                        case namedDirection.west: direction = namedDirection.north; break;
                        default:
                    }
                } else { 
                    // turn left
                    switch(direction) {  
                        case namedDirection.north: direction = namedDirection.west; break;
                        case namedDirection.west: direction = namedDirection.south; break;
                        case namedDirection.south: direction = namedDirection.east; break;
                        case namedDirection.east: direction = namedDirection.north; break;
                        default:
                    }

                    infectionCount++;
                }

                infectedMap.set(currentPosKey, !currentInfected);

                position = [position[0] + direction.x, position[1] + direction.y];
            }

            
            this.props.setDay22Output1(infectionCount);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
            const CLEAN = 'clean';
            const INFECTED = 'infected'; 
            const WEAKENED = 'weakened'; 
            const FLAGGED = 'flagged'; 

            const infectedMap = new Map();
            const lines = input1.split(/[\r\n]/);
            lines.forEach((l, row) => { 
                const chars = l.split('');
                chars.forEach((c, column) => {
                    if(c == '#') {
                        infectedMap.set(column + ',' + row, INFECTED);
                    } else {
                        infectedMap.set(column + ',' + row, CLEAN);
                    }
                });
            });

            const size = lines.length;
            var position = [Math.floor(size / 2), Math.floor(size / 2)];
            var direction = namedDirection.north;
            var infectionCount = 0;

            for(var i = 0; i < 10000000; i++) {
                const currentPosKey = position.join(',');
                const currentState = infectedMap.get(currentPosKey) || CLEAN;
                switch(currentState) { 
                    case INFECTED: {
                        // turn right
                        switch(direction) { 
                            case namedDirection.north: direction = namedDirection.east; break;
                            case namedDirection.east: direction = namedDirection.south; break;
                            case namedDirection.south: direction = namedDirection.west; break;
                            case namedDirection.west: direction = namedDirection.north; break;
                            default:
                        }

                        // INFECTED -> FLAGGED
                        infectedMap.set(currentPosKey, FLAGGED);

                        break;
                    }
                    case CLEAN: { 
                        // turn left
                        switch(direction) {  
                            case namedDirection.north: direction = namedDirection.west; break;
                            case namedDirection.west: direction = namedDirection.south; break;
                            case namedDirection.south: direction = namedDirection.east; break;
                            case namedDirection.east: direction = namedDirection.north; break;
                            default:
                        }

                        // CLEAN -> WEAKENED
                        infectedMap.set(currentPosKey, WEAKENED);

                        break;
                    }
                    case WEAKENED: { 
                        // no turn for weakened

                        // WEAKENED -> INFECTED
                        infectedMap.set(currentPosKey, INFECTED);
                        infectionCount++;

                        break;
                    }
                    case FLAGGED: { 
                        // reverse direction
                        switch(direction) {  
                            case namedDirection.north: direction = namedDirection.south; break;
                            case namedDirection.west: direction = namedDirection.east; break;
                            case namedDirection.south: direction = namedDirection.north; break;
                            case namedDirection.east: direction = namedDirection.west; break;
                            default:
                        }

                        // FLAGGED -> CLEAN
                        infectedMap.set(currentPosKey, CLEAN);

                        break;
                    }
                }

                position = [position[0] + direction.x, position[1] + direction.y];
            }

            this.props.setDay22Output2(infectionCount);
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
                    grid crawler
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay22Input1(text)}
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

export default comp = defineView(Day22, (state) => {
    return { 
        input1: state.day22Input1, 
        output1: state.day22Output1,
        output2: state.day22Output2,
    }
});