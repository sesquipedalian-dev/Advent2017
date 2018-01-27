import React, {Component} from 'react'; 
import { View, Text, Button, TextInput, ScrollView } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class Day4 extends Component {
    back() { 
        Actions.pop();
    } 

    solveInput1(input) { 
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            const passphrases = input1.split(/[\r\n]/);
            var sum = 0; 
            passphrases.forEach(function(element) {
                const words = element.split(/\s+/); 
                var foundDupe = false;
                words.forEach(function(element2) { 
                    foundDupe = foundDupe || (words.indexOf(element2) != words.lastIndexOf(element2));
                }, this);                   
                if(!foundDupe) { 
                    sum++;
                }
            }, this);

            this.props.setDay4Output1(sum);
        }
    }

    wordToCounts(word) { 
        const wordCountsForWord = new Map();
        word.split('').forEach(function(c) { 
            wordCountsForWord.set(c, (wordCountsForWord.get(c) || 0) + 1);
        })
        return wordCountsForWord;
    }

    solveInput2(input) { 
        const wordToCounts = this.wordToCounts;
        const input1 = this.props.input1;
        if(typeof input1 === 'string') {
            const passphrases = input1.split(/[\r\n]/);
            var sum = 0; 
            passphrases.forEach(function(element) {
                const words = element.split(/\s+/); 
                var foundDupe = false;
                words.forEach(function(word) { 
                    if(word.length == 0) { 
                        return;
                    }
                    // first check simple dupe in array - if this then don't need to 
                    // do full anagram check
                    var isDupe = (words.indexOf(word) != words.lastIndexOf(word));  
                    if(!isDupe) { 
                        const wordCountsForWord = wordToCounts(word);
                        words.forEach(function(otherWord) { 
                            if((otherWord != word) && (otherWord.length == word.length)) { 
                                const otherWordCounts = wordToCounts(otherWord);
                                var charCountsMatch = true;
                                for(var [key, val] of wordCountsForWord) { 
                                    charCountsMatch = charCountsMatch && (val == otherWordCounts.get(key));
                                }
                                isDupe = isDupe || charCountsMatch;
                            }
                        })
                    }
                    console.log("Comparing words for anagram", word, isDupe);
                    foundDupe = foundDupe || isDupe;
                }, this);                   
                if(!foundDupe) { 
                    sum++;
                }
            }, this);

            this.props.setDay4Output2(sum);
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
                <Text>Part 1: Look through the passphrase list and count passphrases that don't contain duplicate words (separated by spaces)</Text>
                <TextInput
                    multiline={true}
                    value={this.props.input1}
                    onChangeText={(text) => this.props.setDay4Input1(text)}
                />
                <Button
                    onPress={this.solveInput1.bind(this)}
                    title='Solve!'
                />
                <Text>{output1Value}</Text>

                <Text>
                    Part 2: now 'duplicate words' means that they're anagrams
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

export default comp = defineView(Day4, (state) => {
    return { 
        input1: state.day4Input1, 
        output1: state.day4Output1,
        output2: state.day4Output2,
    }
});