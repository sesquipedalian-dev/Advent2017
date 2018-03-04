import React from 'react';
import ReactNative, { View, Text, AppRegistry } from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import reducer from './js/reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

/**********************
 * REDUX MIDDLEWARE
 * In this section, we create redux middleware.  This adds features to 
 * Redux's state store.
 * logger - while using JS remote debugging in a browser window, logs the entire
 * state with each state change in such a way that you can inspect it using 
 * a browser's developer tools.  hit localhost:8081/debugger-ui after enabling
 * remote JS debugging in the running native app
 * 
 * thunk - allows actions to return a function (dispatch, getState) => Unit
 * instead of just an action. This can be handy for async operations - see 
 * js/actions/recipes/delayed for an example. 
 */
const loggerMiddleware = createLogger({
    predicate: (getState, action) => __DEV__
});

function configureStore(initialState) { 
    const enhancer = applyMiddleware(
        loggerMiddleware,
        thunk
    );
    // here we're creating redux's store based on our reducer
    // (imported from js/reducers/index.js) and the middleware
    return createStore(reducer, initialState, enhancer);
}

// initial store with no initial state - typical pattern is reducers are 
// responsible for a sensible initial state
const store = configureStore({});

// in this section, create the magical Router from react-native-router flux
// that lets us define our scenes / routes.  Since this is the top-level
// component, it can manage the route state.
import { Router, Scene } from 'react-native-router-flux';
const RouterWithRedux = connect()(Router);

// in this section, define the routes for the app.  
// each scene can be a separate container component 
import { connect } from 'react-redux';
import { Component } from 'react';
import AppContainer from './js/containers/app';
import Day1 from './js/containers/day1';
import Day2 from './js/containers/day2';
import Day3 from './js/containers/day3';
import Day4 from './js/containers/day4';
import Day5 from './js/containers/day5';
import Day6 from './js/containers/day6';
import Day7 from './js/containers/day7';
import Day8 from './js/containers/day8';
import Day9 from './js/containers/day9';
import Day10 from './js/containers/day10';
import Day11 from './js/containers/day11';
import Day12 from './js/containers/day12';
import Day13 from './js/containers/day13';
import Day14 from './js/containers/day14';
import Day15 from './js/containers/day15';
import Day16 from './js/containers/day16';
import Day17 from './js/containers/day17';
import Day18 from './js/containers/day18';
import Day19 from './js/containers/day19';
import Day20 from './js/containers/day20';
import Day21 from './js/containers/day21';

class App extends Component { 
    render() { 
        return ( 
            <Provider store={store}>
                <RouterWithRedux>
                    {/* a root scene is required by the router.  It can take a
                    few forms though (e.g. tabs, stacks, etc) */}
                    <Scene key="root">
                        <Scene key="landing" component={AppContainer} title="Landing"/>
                        <Scene key="day1" component={Day1} title="Day 1"/>
                        <Scene key="day2" component={Day2} title="Day 2"/>
                        <Scene key="day3" component={Day3} title="Day 3"/>
                        <Scene key="day4" component={Day4} title="Day 4"/>
                        <Scene key="day5" component={Day5} title="Day 5"/>
                        <Scene key="day6" component={Day6} title="Day 6"/>
                        <Scene key='day7' component={Day7} title="Day 7"/>
                        <Scene key='day8' component={Day8} title="Day 8"/>
                        <Scene key='day9' component={Day9} title="Day 9"/>
                        <Scene key='day10' component={Day10} title="Day 10"/>
                        <Scene key='day11' component={Day11} title="Day 11"/>
                        <Scene key='day12' component={Day12} title="Day 12"/>
                        <Scene key='day13' component={Day13} title="Day 13"/>
                        <Scene key='day14' component={Day14} title="Day 14"/>
                        <Scene key='day15' component={Day15} title="Day 15"/>
                        <Scene key='day16' component={Day16} title="Day 16"/>
                        <Scene key='day17' component={Day17} title="Day 17"/>
                        <Scene key='day18' component={Day18} title="Day 18"/>
                        <Scene key='day19' component={Day19} title="Day 19"/>
                        <Scene key='day20' component={Day20} title="Day 20"/>
                        <Scene key='day21' component={Day21} title="Day 21"/>
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}

// register the js components of the app with the native layer
AppRegistry.registerComponent('Advent2017', () => App);