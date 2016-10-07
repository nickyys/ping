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
  Image,
  StatusBar,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';

//导入对话框
let ConfirmDialog=require('./dialog');

//简单封装一个组件
class CustomButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

class RewriteExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    var limit = 20;
    var remainder = limit - this.state.text.length;
    var remainderColor = remainder > 5 ? 'blue' : 'red';
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          multiline={false}
          maxLength={limit}
          onChangeText={(text) => {
            text = text.replace(/ /g, '_');
            this.setState({text});
          }}
          style={styles.default}
          value={this.state.text}
        />
        <Text style={[styles.remainder, {color: remainderColor}]}>
          {remainder}
        </Text>
      </View>
    );
  }
}

class ping extends Component {
  constructor (props) {
    super (props)
    this.state = {
    txtValue: null,
    _tips : null
    }
  }

  // 定义函数

  //呈送加载视图
  renderTipsView() {
    
  }

  // 绘制渲染的控件  
  render() {
    return (

      <View style={styles.scene}>
        <StatusBar
          backgroundColor='#F4F4F4'
          barStyle='light-content'
          translucent={true}
          hidden={false}
          animated={true}
        />
        <View style={styles.t1}>
          <Text style={styles.t1Text}>当前网络为4G</Text>
          <Text style={styles.t2Text}>IP:138.125.66.32 中国梅州</Text>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            autoCapitalize="none"
            onChangeText={(text) => {
            this.state.txtValue = text
            }}
            value={this.state.text}
            placeholder='请输入IP、网址'
            placeholderTextColor='#CCCCCC'
          />
          <TouchableHighlight
            style={styles.inputBtn}
            underlayColor="#a5a5a5"
            onPress={() => {ToastAndroid.show('你点击了我了~好疼！', ToastAndroid.LONG)}}
          >
            <Image style={{width:27,height:16}} source={require('./images/ico_down.png')} />
          </TouchableHighlight>          
        </View>
        <CustomButton text='Ping' onPress={() => {
          if(this.state.txtValue==null){
            ToastAndroid.show('你点击了我了~好疼!', ToastAndroid.LONG);            
          }else{
            ToastAndroid.show('你点击了'.this.state.txtValue, ToastAndroid.LONG)
          }
        }} 
        />
        <View style={styles.p1}>
          <Image style={styles.p1LT} source={require('./images/sticker.png')} />
          <Image style={styles.p1RB} source={require('./images/sticker.png')} />
          <Text style={styles.p1Text}>Ping指的是端对端连通，通常用来作为可用性的检查，但是某些病毒木马会强行大量远程执行Ping命令抢占你的网络资源，导致系统变慢。严禁Ping入侵作为大多数防火墙的一个基本功能提供给用户进行选择。通常的情况下你如果不用作服务器或者进行网络测试，可以放心的选中它，保护你的电脑。</Text>
        </View>

        <View style={[styles.hide,styles.inputList]}>
          <Text style={styles.inputList1}>历史记录</Text>
          <Text style={styles.inputListItem}>192.168.100.50</Text>
          <Text style={styles.inputListItem}>202.96.128.110</Text>
          <Text style={styles.inputListItem}>www.bukade.com</Text>
        </View>
        <View style={[styles.hide,styles.tips]} testID = 'debug-tips'>
          <Image style={{width:124,height:124}} source={require('./images/tips.png')} />
          <Text style={styles.tipsText}>请输入IP、网址</Text>
        </View>
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  hide:{
    opacity:0
  },
  show:{
    opacity:1
  },
  scene: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  t1:{
    marginTop:34,    
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  t1Text:{    
    fontSize: 22,
    color:'#777777',
    textAlign:'center'
  },
  t2Text:{
    marginTop:5,
    marginBottom:10,
    fontSize: 22,
    color:'#333333',
    textAlign:'center'
  },
  p1:{
    position:'relative',
    marginLeft:34,
    marginRight:34,
    padding:10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor:'#fffede',
  },
  p1Text:{
    fontSize:18,
  },
  p1LT:{
    position:'absolute',
    left:-30,
    top:-30,
    width: 88,
    height:88,
  },
  p1RB:{
    position:'absolute',
    right:-30,
    bottom:-30,
    width: 88,
    height:88,
  },
  inputBox:{
    position:'relative',
    margin:34,
    marginBottom:0,
    paddingLeft:5,
    paddingRight:5,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor:'#FFFFFF',
  },
  inputText:{
    fontSize: 22,
    color:'#777777',
  },
  inputBtn:{
    position:'absolute',
    right:15,
    top:30,
    width: 27,
    height:16,
  },
  inputList:{
    position:'absolute',
    zIndex:7,
    left:34,
    top:1205,
    width:292,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderWidth: 1,
    borderTopWidth:0,
    borderColor: '#DDDDDD',    
    backgroundColor:'#FFFFFF',
  },
  inputList1:{
    padding:10,
    fontSize: 18,
    color:'#777777',
    backgroundColor:'#f8f8f8',
  },
  inputListItem:{
    padding:10,
    fontSize: 18,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  button: {
    margin: 34,    
    padding:5,
    borderRadius:10,
    backgroundColor:'#3472ff',
  },
  buttonText:{
    fontSize: 46,
    color:'#ffffff',
    textAlign:'center'
  },
  tips:{
    // visibility:'hidden',
    position:'absolute',
    zIndex:9,
    left:85,
    top:200,
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
  },
  tipsText:{
    fontSize: 22,
    color:'#FFFFFF',
  }
  
});

AppRegistry.registerComponent('ping', () => ping);
