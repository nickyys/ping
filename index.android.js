/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
  StatusBar,
  TouchableHighlight
} from 'react-native';


//简单封装一个组件
class CustomButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

class ping extends Component {
  constructor(props){
    super(props);
    this.state={
    };
  }
  render() {
    return (
      <View style={styles.scene}>
        <StatusBar
          backgroundColor='#F4F4F4'
          translucent={true}
          hidden={false}
          animated={true}      
        />
        <View style={styles.t1}><Text style={styles.t1Text}>当前网络为4G</Text></View>
        <View style={styles.t2}><Text style={styles.t2Text}>IP:138.125.66.122 中国梅州</Text></View>
        <View style={styles.inputBox}>
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        </View>
        <CustomButton text='Ping'/>
        <View style={styles.p1}><Text>Ping指的是</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  t1:{
    flex: 1,margin:0,padding:0,
    marginTop:48,
    height:38,
  },
  t1Text:{margin:0,padding:0,    
    height:38,
    lineHeight:38,
    fontSize: 28,
    color:'#777777',
    textAlign:'center'
  },
  t2:{
    flex: 1,
    margin:0,
    height:38,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  t2Text:{
    height:38,
    lineHeight:38,
    fontSize: 28,
    color:'#333333',
    textAlign:'center'
  },
  inputBox:{
    margin: 48,
    marginTop:68,
    marginBottom:34,
    padding:5,
    borderRadius:15,
    backgroundColor:'#FFFFFF',
  },
  button: {
    margin: 48,
    marginTop:0,
    padding:5,
    borderRadius:15,
    backgroundColor:'#3472ff',    
  },
  buttonText:{
    fontSize: 46,
    color:'#ffffff',
    textAlign:'center'
  },
  
});

AppRegistry.registerComponent('ping', () => ping);
