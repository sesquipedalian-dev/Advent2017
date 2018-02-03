import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class Day12 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            // construct graph from input representation
            const lines = input1.split(/[\r\n]/);

            const allNodes = new Map();
            var firstId;
            lines.map(line => { 
                const firstSplit = line.split(/\s*<->\s*/);
                const vertex = firstSplit[0]; 
                if(firstId === undefined) { 
                    firstId = vertex;
                }
                const edges = firstSplit[1].split(/\s*,\s*/);
                allNodes.set(vertex, edges);
            });

            // BFS finding sub group
            const seen = new Map([[firstId, true]]);
            var currentNodes = [firstId];
            while(currentNodes.length > 0) { 
                const currentNode = currentNodes.shift();
                const children = allNodes.get(currentNode).filter(c => !seen.get(c));
                children.forEach(child => {
                    seen.set(child, true);
                    currentNodes.push(child);
                });
            }

            
            this.props.setDay12Output1(Array.from(seen.keys()).length);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);

            // construct graph from input representation
            const lines = input1.split(/[\r\n]/);
  
            const allNodes = new Map();
            var firstId;
            lines.map(line => { 
                const firstSplit = line.split(/\s*<->\s*/);
                const vertex = firstSplit[0]; 
                if(firstId === undefined) { 
                    firstId = vertex;
                }
                const edges = firstSplit[1].split(/\s*,\s*/);
                allNodes.set(vertex, edges);
            });

            // BFS finding sub group
            var groupNodes = Array.from(allNodes.keys());
            var groupCount = 0;
            const seen = new Map();
            while(groupNodes.length > 0) { 
                const firstId = groupNodes.shift();
                if(!seen.get(firstId)) {
                    seen.set(firstId, true);
                    var currentNodes = [firstId];
                    while(currentNodes.length > 0) { 
                        const currentNode = currentNodes.shift();
                        const children = allNodes.get(currentNode).filter(c => !seen.get(c));
                        children.forEach(child => {
                            seen.set(child, true);
                            currentNodes.push(child);
                        });
                    }
                    groupCount++;
                }
            }
                        
            this.props.setDay12Output2(groupCount);
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
                    Part 1: identify number of nodes in connected component (subgraph) of a larger graph,
                    using breadth-first search
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay12Input1(text)}
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

export default comp = defineView(Day12, (state) => {
    return { 
        input1: state.day12Input1, 
        output1: state.day12Output1,
        output2: state.day12Output2,
    }
});