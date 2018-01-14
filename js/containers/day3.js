import React, {Component} from 'react'; 
import { View, Text, Button, TextInput } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class GridNums {
    constructor() { 
        this.values = {};
    } 
    get(x, y) {
        return (this.values[x] || {})[y] || 0;
    }
    set(x, y, val) { 
        const intermediate = this.values[x] || {};
        intermediate[y] = val;
        this.values[x] = intermediate;
    }
}

class Day3 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            const inputVal = parseInt(input1);

            // find which ring aroud the origin the input is in
            var n = Math.floor(Math.sqrt(inputVal));
            if(n % 2 == 0) { 
                n = n + 1;
            }

            // set the 'run length' - the distance along one side of the square ring
            const runLength = n - 1;

            // get the index in its run
            const prevRing = Math.pow(n - 2, 2);
            const indexInRing = inputVal - prevRing;
            const indexInRun = indexInRing % runLength;

            // find how far off the minimum manhattan distance for that ring
            // this index is
            const idealIndex = runLength / 2;
            const diffFromIdeal = Math.abs(idealIndex - indexInRun);

            // so the distance is how far off it is from ideal, plus the ideal
            const idealDistance = Math.floor(n / 2);
            const distance = diffFromIdeal + idealDistance;

            this.props.setDay3Output1(distance);
        }
    }

  
    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            const inputVal = parseInt(input1);

            const nums = new GridNums();
            nums.set(0, 0, 1);

            var curX = 1;
            var curY = 0;
            var curI = 2;
            var found = undefined;
            var tries = 1000;
            while(found == undefined && tries > 0) {
                var sum = nums.get(curX, curY + 1);
                sum += nums.get(curX, curY - 1);
                sum += nums.get(curX + 1, curY);
                sum += nums.get(curX - 1, curY);
                sum += nums.get(curX + 1, curY + 1); 
                sum += nums.get(curX + 1, curY - 1);
                sum += nums.get(curX - 1, curY + 1);
                sum += nums.get(curX - 1, curY - 1);
                if(sum > inputVal) { 
                    found = sum;
                } else { 
                    nums.set(curX, curY, sum);
                    console.log("processing element", curI, curX, curY, sum);

                    // to determine direction, find what ring we're in
                    var sqrt = Math.sqrt(curI);
                    var n; 
                    if(sqrt % 2 != 0 && sqrt == Math.floor(sqrt)) { 
                        n = sqrt;
                    } else { 
                        n = Math.floor(Math.sqrt(curI));
                        if(n % 2 == 0) { 
                            n = n + 1;
                        } else { 
                            n = n + 2;
                        }
                    }

                    // find the ranges
                    const runLength = n - 1;

                    // find direction based on how far aroud the ring we get
                    const indexInRing = curI - Math.pow(n - 2, 2);
                    if(indexInRing >= (runLength * 3)) {
                        curX += 1;
                    } else if (indexInRing >= (runLength * 2)) { 
                        curY -= 1;
                    } else if (indexInRing >= runLength) { 
                        curX -= 1; 
                    } else { 
                        curY += 1;
                    }
                    console.log("where to go?", n, runLength, indexInRing);

                    curI++; 
                }
                tries --;
            }

            this.props.setDay3Output2(found);
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
            <View>
                <Text>Part 1: Given a number, find the manhattan distance to it on a spiral grid that goes right then up</Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay3Input1(text)}
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>Part 2: do some crazy thing following the same spiral pattern as previous, but the value in each slot 
                    equals the sum of any neighbors (include diagonals) that have already been populated.  1st 
                    spot starts at 1.</Text>
                <Button 
                    onPress={this.solveInput2.bind(this)}
                    title='Solve!'
                />
                <Text>{output2Value}</Text>

                <Button
                    onPress={this.back.bind(this)}
                    title='go back to landing scene'
                />
            </View>
        );
    }
}

export default comp = defineView(Day3, (state) => {
    return { 
        input1: state.day3Input1, 
        output1: state.day3Output1,
        output2: state.day3Output2,
    }
});