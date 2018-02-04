import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class SecurityLayer { 
    constructor(depth, range, extraSeverity) { 
        this.scannerPos = 0; 
        this.range = range;
        this.depth = depth;
        this.direction = 1;
        this.extraSeverity = extraSeverity || 0;
    }

    getScannerPos() { 
        return this.scannerPos;
    }

    getSeverity() { 
        return (this.depth * this.range) + this.extraSeverity;
    }

    step() { 
        this.scannerPos = this.scannerPos + this.direction; 
        if(this.scannerPos < 0 || this.scannerPos >= this.range) { 
            // reverse direction 
            this.direction = - this.direction; 
            // iterate twice in the new direction
            this.scannerPos = this.scannerPos + this.direction + this.direction;
        }
    }
}


class Day13 extends Component {
    back() { 
        Actions.pop();
    } 

    makeModel(input, extraSeverity) { 
        const lines = input.split(/[\r\\n]/);
        const layerLookup = new Map(); 
        var highestDepth; 
        lines.forEach(line => { 
            const parts = line.split(/\s*:\s*/);
            const depth = parseInt(parts[0]);
            const newLayer = new SecurityLayer(depth, parseInt(parts[1]), extraSeverity);
            layerLookup.set(depth, newLayer);
            if(highestDepth === undefined || highestDepth < depth) { 
                highestDepth = depth;
            }
        });
        return [layerLookup, highestDepth];
    }

    iterateModel(layerLookup, maxDepth, _playerPos) { 
        var playerPos = _playerPos;
        var severity = 0;
        for(; playerPos <= maxDepth; playerPos++) { 
            // check for player hitting a scanner
            const security = layerLookup.get(playerPos); 
            if(security !== undefined && security.getScannerPos() == 0) { 
                // caught
                severity += security.getSeverity();
            }

            // iterate all the security layers
            for(var [d, l] of layerLookup) { 
                l.step();
            }
        }

        return severity;
    }

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
           
            // construct the security model from our input
            const model = this.makeModel(input1);
            const layerLookup = model[0];
            const highestDepth = model[1];

            // iterating the model
            const severity = this.iterateModel(layerLookup, highestDepth, 0);

            this.props.setDay13Output1(severity);
        }
    }

    isCaught(delay, depth, range) { 
        // 2 * (range - 1) is the cycle time for the scanner to get back to 0;
        // delay + depth is the tick on which the player will hit that node
        return ((delay + depth) % (2 * (range - 1))) == 0;
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
            const lines = input1.split(/[\r\n]/);
            const scanners = lines.map(line => { 
                return line.split(/\s*:\s*/).map(str => parseInt(str));
            });

            var currentDelay = 0; 
            while(scanners.reduce((sofar, next) => sofar || this.isCaught(currentDelay, next[0], next[1]), false)) {
                currentDelay++;
            }
                        
            this.props.setDay13Output2(currentDelay);
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
                    Part 1: navigating a layered security system
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay13Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    increasing delay until we find a delay we can use
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

export default comp = defineView(Day13, (state) => {
    return { 
        input1: state.day13Input1, 
        output1: state.day13Output1,
        output2: state.day13Output2,
    }
});