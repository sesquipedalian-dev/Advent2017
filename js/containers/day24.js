import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

// connectors used
const NONE = 'none'; 
const LEFT = 'left';
const RIGHT = 'right'; 

class GraphNode { 
    constructor(left, right, id, initialDistance) { 
        this.left = parseInt(left);
        this.right = parseInt(right);
        this.id = id;

        this.distance = initialDistance || -1;
        this.parent = undefined;
        this.inputUsed = NONE;
    }
}

class Day24 extends Component {
    back() { 
        Actions.pop();
    } 

    recursiveDFS(current, nodes, myValue) { 
        const remainingNodes = nodes.filter(n => n.id != current.id);

        // find neighbors of current, given current as a parent
        var availableConnection = current.right;
        if(myValue == current.right) { 
            availableConnection = current.left;
        }

        const neighbors = remainingNodes.filter(n => n.left == availableConnection || n.right == availableConnection);

        // recursively find the best child
        var bestChild;
        neighbors.forEach(n => { 
            var usedValue = n.left;
            if(n.right == availableConnection) { 
                usedValue = n.right;
            }
            const childResult = this.recursiveDFS(n, remainingNodes, usedValue);
            const childWeight = childResult.reduce((sofar, next) => sofar + next.left + next.right, 0);
            if(!bestChild || childWeight > bestChild[0]) { 
                bestChild = [childWeight, childResult];
            }
        });

        if(bestChild) { 
            bestChild[1].unshift(current);
            return bestChild[1];
        } else { 
            return [current];
        }
    }

    solveInput1Take2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            // set up the nodes collection
            const lines = input1.split(/[\r\n]/);
            const origNodes = lines.map((str, i) => { 
                const parts = str.split('/');
                return new GraphNode(parts[0], parts[1], i);
            });
            const headNode = new GraphNode('0', '0', 0, 0);

            const result = this.recursiveDFS(headNode, origNodes, 0);
            const sum = result.reduce((sofar, next) => sofar + next.left + next.right, 0);

            this.props.setDay24Output1(sum);
        }
    }
    
    // hm - djikstra's doesn't seem to work here
    // maybe just generate a DFS
    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            // set up the nodes collection
            const lines = input1.split(/[\r\n]/);
            const origNodes = lines.map((str, i) => { 
                const parts = str.split('/');
                return new GraphNode(parts[0], parts[1], i);
            });
            const headNode = new GraphNode('0', '0', -1, 0);
            headNode.inputUsed = RIGHT;
            var nodes = Array.from(origNodes);
            nodes.unshift(headNode);
            
            while(nodes.length > 0) { 
                // find the best child to process
                var bestNode = undefined;
                nodes.forEach(n => {
                    if(!bestNode || bestNode[1] < n.distance) { 
                        bestNode = [n, n.distance];
                    }
                });
                const current = bestNode[0];

                // remove it from the queue
                nodes = nodes.filter(n => n.id != current.id);

                // find neighbors of current, given current as a parent
                var availableConnection = current.right;
                if(current.inputUsed == RIGHT) { 
                    availableConnection = current.left;
                }

                const neighbors = nodes.filter(n => n.left == availableConnection || n.right == availableConnection);
                neighbors.forEach(n => { 
                    const newDistance = current.distance + n.left + n.right;
                    if(newDistance > n.distance) { // we found a more weighty path to n
                        n.distance = newDistance;
                        n.parent = current;
                        n.inputUsed = LEFT;
                        if(n.right == availableConnection) { 
                            n.inputUsed = RIGHT;
                        }
                    }
                })
            }

            // find most weighty node
            var maxNode; 
            origNodes.forEach(n => {
                if(!maxNode || n.distance > maxNode) { 
                    maxNode = n.distance;
                }
            });

            this.props.setDay24Output1(maxNode - headNode.distance);
        }
    }

    solveInput1Take3(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            function *build(cur,used,available,strength) {
                for(let [a,b] of available) {
                    if(a === cur || b === cur) {
                        yield* build(a === cur ? b : a,[...used,[a,b]],available.filter(([x,y]) => !(x===a && y===b)),strength+a+b)
                    }
                }
                yield {used,strength}
            }

            let parts = input1.split(/[\r\n]/).map(i => i.split('/').map(n => Number(n)))
            let bridges = [...build(0,[],parts,0)]

            var maxBridge;
            bridges.forEach(bridge => {
                if(!maxBridge || bridge.strength > maxBridge) {
                    maxBridge = bridge.strength;
                }
            });

                // let part2 = bridges.sort((a,b) => b.used.length - a.used.length || b.strength - a.strength)[0].strength
                // console.log(part1,part2)
            
                
            this.props.setDay24Output1(maxBridge);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
            function *build(cur,used,available,strength) {
                for(let [a,b] of available) {
                    if(a === cur || b === cur) {
                        yield* build(a === cur ? b : a,[...used,[a,b]],available.filter(([x,y]) => !(x===a && y===b)),strength+a+b)
                    }
                }
                yield {used,strength}
            }

            let parts = input1.split(/[\r\n]/).map(i => i.split('/').map(n => Number(n)))
            let bridges = [...build(0,[],parts,0)]

            var maxBridge;
            bridges.forEach(bridge => {
                if(!maxBridge || bridge.strength > maxBridge) {
                    maxBridge = bridge.strength;
                }
            });

            let part2 = bridges.sort((a,b) => b.used.length - a.used.length || b.strength - a.strength)[0].strength
              
            this.props.setDay24Output2(part2);
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
                    building a bridge with specific connector units - 
                    Djikstra's algorithm for finding graph traversal 
                    weights
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay24Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1Take3.bind(this)}
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

export default comp = defineView(Day24, (state) => {
    return { 
        input1: state.day24Input1, 
        output1: state.day24Output1,
        output2: state.day24Output2,
    }
});