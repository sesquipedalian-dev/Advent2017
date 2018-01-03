import React, {Component} from 'react'; 
import { View, Text, Button } from 'react-native'; 
import { Actions } from 'react-native-router-flux';
import defineView from '../lib/defineView';

class SecondScene extends Component {
    button() { 
        // popping the router state - sends you back to whoever sent you here
        Actions.pop();
    } 
    render() { 
        return (
            <View>
                <Text>This is the second scene</Text>
                <Button
                    onPress={this.button.bind(this)}
                    title='go back to landing scene'
                />
            </View>
        );
    }
}

// hook up the component view - a limited view of the redux state for use 
// by this component
export default comp = defineView(SecondScene, (state) => {});