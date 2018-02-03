import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class Node { 
    // name - identifier string
    // weight - a number parsed along with the node
    // nodeMap - a Map relating node names to the Node object
    constructor(name, weight, nodeMap) {
        this.name = name;
        this.weight = weight;
        this.parent = undefined;
        this.nodeMap = nodeMap;
        this.children = [];
    }

    // get the children Node objects (must be run after whole tree parsed)
    getChildren() { 
        var retVal = [];
        this.children.forEach(childName => { 
            const node = this.nodeMap.get(childName)
            if(node !== undefined) { 
                retVal.push(node);
            }
        })
        return retVal;
    }

    // set the children node names
    setChildren(childNames) { 
        childNames.forEach(childName => {
            this.children.push(childName);
        });
    }

    // after all the nodes have been created, make sure our children know their parent
    setChildrensParent() { 
        this.children.forEach(childName => { 
            const childNode = this.nodeMap.get(childName)
            if(childNode !== undefined) { 
                childNode.parent = this.name;
            }
        })
    }

    getTowerWeightAndBalanced() { 
        // leaf nodes are always considered 'balanced' and just return their weight
        if(this.children.length == 0) { 
            return [this.weight, undefined];
        } else { 
            // go through our children and see if any of them report unbalanced. 
            // if they do, they know the culprit since we're assuming only
            // 1 node is the problem.
            var childUnbalanced = undefined;
            const childrenBalanced = this.children.map(childName => { 
                const childNode = this.nodeMap.get(childName);
                const childInfo = childNode.getTowerWeightAndBalanced();
                if(childInfo[1] !== undefined) { 
                    childUnbalanced = childInfo[1];
                }
                // return child name and weight so we can evaluate if all children weights are the same
                return [childName, childInfo[0]];
            });

            // early out if we already have the culprit
            if(childUnbalanced !== undefined) { 
                return [0, childUnbalanced];
            }

            // if we have only one child that is inherently balanced
            if(childrenBalanced.length == 1) { 
                return [childrenBalanced[0][1][0] + this.weight, undefined];
            }

            // k, now we need to find which of our child nodes is unbalanced, if any  
            const weightMap = new Map();
            const unbalanced = childrenBalanced.forEach(w => weightMap.set(w[1], (weightMap.get(w[1]) || 0) + 1));
            const unBalancedChild = childrenBalanced.find(c => { 
                return weightMap.get(c[1]) == 1;  // TODO one of the children with count 1 needs updated, but the amount may depend on the higher parts of the stack 
            });
            if(unBalancedChild !== undefined) { 
                const targetWeight = childrenBalanced.find(c => c[1] != unBalancedChild[1])[1];
                const adjust = unBalancedChild[1] - targetWeight;
                const targetNode = this.nodeMap.get(unBalancedChild[0]);
                const result = targetNode.weight - adjust;
                console.log("We might need to try some different results depending here.",
                  childrenBalanced, this.weight, result
                );
                return [0, result];
            }
  
            // if none of our children are throwing it out of whack, then 
            // return our info to the caller
            const childrenWeight = childrenBalanced.reduce((soFar, next) => soFar + next[1], 0);
            return [this.weight + childrenWeight, undefined];
        }
    }
}

// 1086 - 7 = 1079

class Day7 extends Component {
    back() { 
        Actions.pop();
    } 

    parseTree(input) { 
        const nodeMap = new Map();
        const lines = input.split(/[\r\n]/);
        lines.forEach(line => { 
            const parts1 = line.split(/\s*->\s*/);
            if(parts1[0] !== undefined) { 
                const parts2 = parts1[0].split(/\s+/);
                const name = parts2[0];
                const weightPart = parts2[1].replace("(", "").replace(")", "");
                const weight = parseInt(weightPart); 
                
                const node = new Node(name, weight, nodeMap); 

                if(parts1[1] !== undefined) { 
                    const childrenNames = parts1[1].split(/,\s*/);
                    node.setChildren(childrenNames);
                }

                nodeMap.set(name, node);
            }
        })

        nodeMap.forEach((v, k) => v.setChildrensParent());

        // find root node and return that as representation of the whole tree
        var currentNode = nodeMap.values().next().value;
        while(currentNode.parent !== undefined) { 
            currentNode = nodeMap.get(currentNode.parent);
        }

        return currentNode;
    }

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            const rootNode = this.parseTree(input1);
            this.props.setDay7Output1(rootNode.name);
        }
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);

            const rootNode = this.parseTree(input1);
            const balanceInfo = rootNode.getTowerWeightAndBalanced();
            
            this.props.setDay7Output2(balanceInfo[1]);
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
                    Creating a tree structure from text.
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay7Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    Part 2: Find the one node in the tree that has a weight that is unbalancing the tree
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

export default comp = defineView(Day7, (state) => {
    return { 
        input1: state.day7Input1, 
        output1: state.day7Output1,
        output2: state.day7Output2,
    }
});