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
                <Button
                    onPress={Actions.day1}
                    title='Day 1'
                />
                <Button onPress={Actions.day2} title='Day 2'/>
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