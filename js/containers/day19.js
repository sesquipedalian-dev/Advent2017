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

class Day19 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            var x = 0;
            var y = 0;
            const lines = input1.split(/[\r\n]/);
            const maxY = lines.length - 1;
            const maxX = lines[0].length - 1;

            const inBounds = function(x, y) { 
                return (0 <= x) && 
                    (x <= maxX) && 
                    (0 <= y) && 
                    (y <= maxY)
                ;
            }

            // first, find starting X
            x = lines[y].indexOf("|");

            // iterate through the maze
            const direction = namedDirection.south;
            const found = [];

            while(inBounds(x, y)) {
                const thisChar = lines[y][x];
                if(thisChar == '+') { 
                    // figure out which direction we're turning

                    const newDirection = directions.find(d => { 
                        const newX = x + d.x;
                        const newY = y + d.y;

                        const withinBounds = inBounds(newX, newY);
                        if(withinBounds) { 
                            const newChar = lines[newY][newX];
                            const alreadyFoundChar = found.indexOf(newChar) != -1;
                            if(alreadyFoundChar) { 
                                return false;
                            } else { 
                                if(direction.x != 0) { 
                                    return newChar.match(/[a-zA-Z|]/);
                                } else { 
                                    return newChar.match(/[a-zA-Z\-]/);
                                }
                            }
                        } else { 
                            return false;
                        }
                    });

                    direction = newDirection;
                } else if(thisChar.match(/[a-zA-Z]/)) {
                    found.push(thisChar);
                }

                x += direction.x; 
                y += direction.y;
            }
            
            this.props.setDay19Output1(found.join(''));
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
            
            var x = 0;
            var y = 0;
            const lines = input1.split(/[\r\n]/);
            const maxY = lines.length - 1;
            const maxX = lines[0].length - 1;

            const inBounds = function(x, y) { 
                return (0 <= x) && 
                    (x <= maxX) && 
                    (0 <= y) && 
                    (y <= maxY)
                ;
            }

            // first, find starting X
            x = lines[y].indexOf("|");

            // iterate through the maze
            const direction = namedDirection.south;
            const found = [];
            var steps = -1; // off-by-1 error because last iteration sends you out of bounds

            while(inBounds(x, y)) {
                const thisChar = lines[y][x];
                if(thisChar == '+') { 
                    // figure out which direction we're turning

                    const newDirection = directions.find(d => { 
                        const newX = x + d.x;
                        const newY = y + d.y;

                        const withinBounds = inBounds(newX, newY);
                        if(withinBounds) { 
                            const newChar = lines[newY][newX];
                            const alreadyFoundChar = found.indexOf(newChar) != -1;
                            if(alreadyFoundChar) { 
                                return false;
                            } else { 
                                if(direction.x != 0) { 
                                    return newChar.match(/[a-zA-Z|]/);
                                } else { 
                                    return newChar.match(/[a-zA-Z\-]/);
                                }
                            }
                        } else { 
                            return false;
                        }
                    });

                    direction = newDirection;
                } else if(thisChar.match(/[a-zA-Z]/)) {
                    found.push(thisChar);
                }

                x += direction.x; 
                y += direction.y;
                steps++;
            }
                        
            this.props.setDay19Output2(steps);
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
                    'maze' parser - specific locations passed through
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay19Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    maze parser - steps taken
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

export default comp = defineView(Day19, (state) => {
    return { 
        input1: state.day19Input1, 
        output1: state.day19Output1,
        output2: state.day19Output2,
    }
});