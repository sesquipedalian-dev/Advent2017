import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class App extends Component { 
    changeInt() { 
        // call a redux action to change the state
        this.props.delayed(1);
    }

    render() { 
        return (
            <View>
                <Text>Welcome to the Advent of Code!</Text>
                <Text>Go to a day!</Text>
                <Button onPress={Actions.day13} title='Day 13'/>
                <Button onPress={Actions.day12} title='Day 12'/>
                <Button onPress={Actions.day11} title='Day 11'/>
                <Button onPress={Actions.day10} title='Day 10'/>
                <Button onPress={Actions.day9} title='Day 9'/>
                <Button onPress={Actions.day8} title='Day 8'/>
                <Button onPress={Actions.day7} title='Day 7'/>
                <Button onPress={Actions.day6} title='Day 6'/>
                <Button onPress={Actions.day5} title='Day 5'/>
                <Button onPress={Actions.day4} title='Day 4'/>
                <Button onPress={Actions.day3} title='Day 3'/>
                <Button onPress={Actions.day2} title='Day 2'/>
                <Button onPress={Actions.day1} title='Day 1'/>    
            </View>
        );
    }
}

// hook up component view - a portion of the state
export default comp = defineView(App, (state) => {
    return {
        anInt: state.anInt,
        aSecondInt: state.aSecondInt
    }
});