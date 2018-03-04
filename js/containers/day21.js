import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class ImageTransform { 
    constructor(inputBlock, outputBlock) { 
        this.inputBlocks = operations.map(o => o.do(inputBlock));
        this.outputBlock = outputBlock;
    }

    matches(matchMe) { 
        return this.inputBlocks.find(b => b.id() == matchMe.id());
    }
}

class ImageBlock { 
    constructor(input) { 
        if(input) { 
            const rows = input.match(/\//g).length + 1;
            this.value = [];
            for(var i = 0; i < rows; i++) {
                const thisRow = []; 
                for(var j = 0; j < rows; j++) { 
                    switch(input[(i * (rows + 1)) + j]) { 
                        case '.': thisRow.push(0); break;
                        case '#': thisRow.push(1); break;
                        default:
                    }
                }
                this.value.push(thisRow);
            }
            this.order = rows;
        } else { 
            this.value = [];
        }
    }

    id() { 
        var output = '';
        for(var i = 0; i < this.order; i++) { 
            output += this.value[i].join('') + ';';
        }
        return output;
    }
}

class Operation { 
    constructor(name) { 
        this.name = name;
    }

    do(imageBlock) { 
        return imageBlock;
    }
}

class NopOperation extends Operation { 
    constructor() { 
        super("Nop");
    }

    do(imageBlock) { 
        return imageBlock;
    }
}

class RotateOperation extends Operation { 
    constructor() { 
        super("Rotate");
    }

    do(imageBlock) { 
        const retVal = new ImageBlock();
        retVal.order = imageBlock.order;
        for(var i = 0; i < imageBlock.order; i++) { 
            const newRow = [];
            for(var j = 0; j < imageBlock.order; j++) { 
                newRow.push(imageBlock.value[imageBlock.order - 1 - j][i]);
            }
            retVal.value.push(newRow);
        }
        return retVal;
    }
}

class FlipHorizontalOperation extends Operation { 
    constructor() { 
        super("FlipHorizontal");
    }

    do(imageBlock) { 
        const retVal = new ImageBlock();
        retVal.order = imageBlock.order;
        for(var i = 0; i < imageBlock.order; i++) { 
            const newRow = [];
            for(var j = 0; j < imageBlock.order; j++) { 
                newRow.push(imageBlock.value[i][imageBlock.order - 1 - j]);
            }
            retVal.value.push(newRow);
        }
        return retVal; 
    }
}

class FlipVerticalOperation extends Operation { 
    constructor() { 
        super("FlipVertical");
    }

    do(imageBlock) { 
        const retVal = new ImageBlock();
        retVal.order = imageBlock.order;
        for(var i = 0; i < imageBlock.order; i++) { 
            const newRow = [];
            for(var j = 0; j < imageBlock.order; j++) { 
                newRow.push(imageBlock.value[imageBlock.order - 1 - i][j]);
            }
            retVal.value.push(newRow);
        }   
        return retVal;
    }
}

class CombinatedOperation extends Operation { 
    constructor(operations) { 
        super(operations.map(o => o.name).join('And'));
        this.operations = operations;
    }

    do(imageBlock) { 
        return this.operations.reduce((soFar, next) => next.do(soFar), imageBlock);
    }
}

// this should be the list of flip / rotate operations that result in distinct 
// variations of the matrix
const operations = [
    new NopOperation(),
    new RotateOperation(), 
    new CombinatedOperation([new RotateOperation(), new RotateOperation(), new RotateOperation()]), 
    new FlipHorizontalOperation(), 
    new FlipVerticalOperation(),
    new CombinatedOperation([new FlipHorizontalOperation(), new FlipVerticalOperation()]),
    new CombinatedOperation([new RotateOperation(), new FlipHorizontalOperation()]), 
    new CombinatedOperation([new RotateOperation(), new FlipVerticalOperation()]),
    new CombinatedOperation([
        new RotateOperation(), new RotateOperation(), new RotateOperation(),
        new FlipHorizontalOperation()
    ]),
    new CombinatedOperation([
        new RotateOperation(), new RotateOperation(), new RotateOperation(),
        new FlipVerticalOperation()
    ])
];

class Day21 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
            const result = this.doIt(input1, 5);
            this.props.setDay21Output1(result);
        }
    }

    doIt(input1, iterations) { 
        const lines = input1.split(/[\r\n]/);
        const regex = /([^\s]*)\s*=>\s*([^\s]*)/;
        const transformRules = lines.map(line => { 
            const match = regex.exec(line);
            if(match) { 
                const inputBlock = match[1];
                const outputBlock = match[2];
                return new ImageTransform(new ImageBlock(inputBlock), new ImageBlock(outputBlock));
            } else { 
                return null;
            }
        }).filter(o => o != null);

        var image = ".#./..#/###";
        for(var i = 0; i < iterations; i++) { 
            // figure out the block size (2 by 2 or 3 by 3)
            const imageArr = Array.from(image);
            const order = Math.sqrt(imageArr.filter(c => c != '/').length);
            var blockSize = 3;
            if(order % 2 == 0) { 
                blockSize = 2;
            }

            // how many groups will be in the output
            const groups = Math.floor(order / blockSize);

            // construct an array of groups;
            const outputGroups = [];
            for(var groupI = 0; groupI < groups; groupI++) {
                const thisOutputRow = [];
                for(var groupJ = 0; groupJ < groups; groupJ++) { 
                    // construct the ImageBlock for this group
                    var blockStrs = [];
                    for(var rowI = 0; rowI < blockSize; rowI++) { 
                        const indexInStr = (((groupI * blockSize) + rowI) * ((blockSize * groups) + 1)) + 
                            (groupJ * blockSize)
                        ;
                        const rowString = imageArr.slice(indexInStr, indexInStr + blockSize).join('');
                        blockStrs.push(rowString);
                    }
                    const blockStr = blockStrs.join('/');
                    const groupImageBlock = new ImageBlock(blockStr);

                    // transform the block according to the rules
                    const transformed = transformRules.find(t => t.matches(groupImageBlock));
                    var outputBlock = groupImageBlock;
                    if(transformed) { 
                        outputBlock = transformed.outputBlock;
                    } 

                    thisOutputRow.push(outputBlock);
                }
                outputGroups.push(thisOutputRow);
            } 

            // convert the resulting output blocks into a string representation
            var outputRows = [];
            for(var groupI = 0; groupI < groups; groupI++) { 
                for(var row = 0; row < blockSize + 1; row++) { 
                    var thisRow = '';
                    for(var groupJ = 0; groupJ < groups; groupJ++) {
                        for(var column = 0; column < blockSize + 1; column++) {  
                            switch(outputGroups[groupI][groupJ].value[row][column]) { 
                                case 0: thisRow += '.'; break;
                                case 1: thisRow += '#'; break;
                                default:
                            }
                        }
                    }
                    outputRows.push(thisRow);
                }
            }
            image = outputRows.join('/');
        }

        const retVal = Array.from(image).filter(c => c == '#').length;
            
        return retVal;
    }

    solveInput2(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            console.log("using input ", input1);
 
            const result = this.doIt(input1, 18);
            this.props.setDay21Output2(result);
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
                    Image pixel rotations algorithm
                </Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay21Input1(text)}
                    returnKeyType='none'
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    Same thing but longer?
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

export default comp = defineView(Day21, (state) => {
    return { 
        input1: state.day21Input1, 
        output1: state.day21Output1,
        output2: state.day21Output2,
    }
});