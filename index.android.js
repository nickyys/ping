/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import MainView from './main';
import PingView from './ping';

class ping extends Component {
  constructor (props) {
    super (props)
    this.state = {
    }
  }

  // 定义函数

  configureScenceAndroid(){
    return Navigator.SceneConfigs.FadeAndroid;
  }

  renderSceneAndroid(route, navigator){
    _navigator = navigator;

    switch (route.id) {
      case 'ping':
        return (
        <PingView navigator={navigator} route={route} ip={route.ip}/>
      );
      default:
        return (
        <MainView navigator={navigator} route={route} />
       );
    }
  }

  // 绘制渲染的控件  
  render() {
    var renderScene = this.renderSceneAndroid;
    var configureScence = this.configureScenceAndroid;
    return (
      <Navigator
        debugOverlay={false}
        initialRoute={{ title: 'Main', id:'main'}}
        configureScence={{ configureScence }}
        renderScene={renderScene}
      />    
    );
  }

}

AppRegistry.registerComponent('ping', () => ping);
