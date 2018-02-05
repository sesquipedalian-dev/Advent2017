import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';
import {knotHash} from '../lib/knotHash';

const numHashes = 128;
class Day14 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            const hashValues = [];
            for(var i = 0; i < numHashes; i++) { 
                const id = input1 + '-' + i.toString();
                const hash = knotHash(id);
                hashValues.push(hash);
            }

            const used = hashValues.reduce((sofar, next) => { 
                const hexChars = next.split('');
                const usedThisRow = hexChars.reduce((sofar1, next1) => {
                    const binaryString = parseInt(next1, 16).toString(2);
                    const match = binaryString.match(/1/g);
                    if(!match) { 
                        return sofar1;
                    } else { 
                        return sofar1 + match.length;
                    }
                }, 0);
                return sofar + usedThisRow;
            }, 0);
            
            this.props.setDay14Output1(used);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
            // construct knot hashes
            const hashValues = [];
            for(var i = 0; i < numHashes; i++) { 
                const id = input1 + '-' + i.toString();
                const hash = knotHash(id);
                hashValues.push(hash);
            }

            // construct a grid of 0s and 1s based on the hex hashes
            const grid = [];
            const used = hashValues.forEach(next => { 
                const hexChars = next.split('');
                hexChars.forEach(next1 => {
                    var binaryString = parseInt(next1, 16).toString(2);
                    const initialLength = binaryString.length;
                    for(var i = 0; i < 4 - initialLength; i++) { 
                        binaryString = "0" + binaryString;
                    }

                    const binaryChars = binaryString.split('');
                    binaryChars.forEach(char => { 
                        grid.push(parseInt(char));
                    })
                });
            });

            // BFS on the grid to find connected subgroups
            const seen = new Map(); // [x, y] to true / false
            var groupCount = 0; 
            for(var x = 0; x < numHashes; x++) { 
                for(var y = 0; y < numHashes; y++) { 
                    const firstId = [x, y]; 
                    if(!seen.get(firstId.join(',')) && grid[firstId[0] * numHashes + firstId[1]] == 1) { 
                        seen.set(firstId.join(','), true); 
                        groupCount++;
                        var currentNodes = [firstId]; 
                        while(currentNodes.length > 0) { 
                            const currentNode = currentNodes.shift();
                            const currentX = currentNode[0]; 
                            const currentY = currentNode[1];
                            const children = []; 
                            if(currentX > 0) { 
                                children.push([currentX - 1, currentY]);
                            }
                            if(currentX < numHashes - 1) {
                                children.push([currentX + 1, currentY]);
                            }
                            if(currentY > 0) { 
                                children.push([currentX, currentY - 1]);
                            }
                            if(currentY < numHashes - 1) { 
                                children.push([currentX, currentY + 1]);
                            }

                            children.forEach(child => { 
                                if(!seen.get(child.join(',')) && grid[child[0] * numHashes + child[1]] == 1) { 
                                    seen.set(child.join(','), true); 
                                    currentNodes.push(child);
                                }
                            })
                        }
                    }
                }
            }

            this.props.setDay14Output2(groupCount);
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
                    Part 1: memory defragging - find used blocks
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay14Input1(text)}
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

export default comp = defineView(Day14, (state) => {
    return { 
        input1: state.day14Input1, 
        output1: state.day14Output1,
        output2: state.day14Output2,
    }
});