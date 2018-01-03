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
                <Text>Hello, World!</Text>
                <Text>Number: {this.props.anInt}</Text>
                <Text>Number2: {this.props.aSecondInt}</Text>
                <Button
                    onPress={this.changeInt.bind(this)}
                    title='change the int!'
                />
                <Button
                    onPress={
                        /* Use the router's Actions to go to another scene - 
                           the one with key = 'other' in the router definition
                           in index.js
                        */
                        Actions.other
                    }
                    title='go to second scene!'
                />
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