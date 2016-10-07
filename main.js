import React, { Component } from 'react';
import { AppRegistry, StyleSheet, StatusBar, View, Image, Text, TextInput, TouchableHighlight, ToastAndroid, Navigator, BackAndroid } from 'react-native';

BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator == null){
    return false;
  }
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});

var _navigator;

export default class MainView extends Component {
  static get defaultProps() {    
    return {
      title: 'MainView'      
    };
  }

  constructor (props) {
    super (props)
    _navigator = this.props.navigator;
    this.state = {
    txtValue: null,
    _tips : null,    
    }
  }

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
          value={this.state.txtValue}
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

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          if(this.state.txtValue==null){
            ToastAndroid.show('提示为空!', ToastAndroid.LONG);
          }else{
            _navigator.push({ id: 'ping',ip: this.state.txtValue });
          }
        }} 
      >
        <Text style={styles.buttonText}>Ping</Text>
      </TouchableHighlight>

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
    )
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
