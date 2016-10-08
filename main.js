import React, { Component } from 'react';
import { AppRegistry, StyleSheet, StatusBar, ListView, View, Image, Text, TextInput, TouchableOpacity, BackAndroid } from 'react-native';

import langsData from './data.json';

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

  componentDidMount() {
    for(var i=0,l=langsData.length;i<l;i++){
      console.log(langsData[i]);
    }
  }

  constructor (props) {
    super (props)
    _navigator = this.props.navigator;
    this.state = {
    txtValue: '',
    _tipsText: '',
    _tips: 0,
    _tipsTop: 1999,
    _list: 0,
    _listTop: 1999,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    }    
  }

  isDomain(value) {
    var tmp_arr = value.split("."),
      tmp_len = tmp_arr.length;
    return (tmp_len < 2) ? false : true;
  }

  showTips(text){
    this.setState({_tipsText: text});
    this.setState({_tips: 1, _tipsTop: 205});

    setTimeout(
      () => { this.setState({_tips: 0, _tipsTop: 1999}); },
      50
    );
  }

  //呈送数据视图
  renderData(data) {
    return (
      <TouchableOpacity onPress={() => _navigator.push({id: 'show'})}>
        <View style={styles.container}>
          <Text style={styles.inputListItem}>{data.text}</Text>
       </View>
      </TouchableOpacity>
    )
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
          onBlur ={(text) => {
          this.setState({_list: 0, _listTop: 1999});
          this.setState({_tips: 0, _tipsTop: 1999});
          }}
          onFocus={(text) => {
          this.setState({_list: 0, _listTop: 1999});
          this.setState({_tips: 0, _tipsTop: 1999});
          }}
          placeholder='请输入IP、网址'
          placeholderTextColor='#CCCCCC'
        />
        <TouchableOpacity
          style={styles.inputBtn}
          activeOpacity='0.8'
          onPress={() => {
            if(this.state._list==0){
              //取数据
              for(var i=0,l=langsData.length;i<l;i++){
                console.log(langsData[i]);
              }

              this.setState({_list: 1, _listTop: 205});
            }else{
              this.setState({_list: 0, _listTop: 1999});
            }
          }}
        >
          <Image style={{width:27,height:16}} source={require('./images/ico_down.png')} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity='0.8'
        onPress={() => {
          if(this.state.txtValue){
            if(this.isDomain(this.state.txtValue)){
              _navigator.push({ id: 'ping',ip: this.state.txtValue });
            }else{
              this.showTips('输入格式错误');
            }            
          }else{
            this.showTips('请输入IP、网址');
          }
        }} 
      >
        <Text style={styles.buttonText}>Ping</Text>
      </TouchableOpacity>

      <View style={styles.p1}>
        <Image style={styles.p1LT} source={require('./images/sticker.png')} />
        <Image style={styles.p1RB} source={require('./images/sticker.png')} />
        <Text style={styles.p1Text}>Ping指的是端对端连通，通常用来作为可用性的检查，但是某些病毒木马会强行大量远程执行Ping命令抢占你的网络资源，导致系统变慢。严禁Ping入侵作为大多数防火墙的一个基本功能提供给用户进行选择。通常的情况下你如果不用作服务器或者进行网络测试，可以放心的选中它，保护你的电脑。</Text>
      </View>

      <View style={[styles.inputList,{opacity: this.state._list,top: this.state._listTop}]}>
        <Text style={styles.inputList1}>历史记录</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderData}
          style={styles.listView}
         />
      </View>
      <View style={[styles.tips,{opacity: this.state._tips,top: this.state._tipsTop}]} testID = 'debug-tips'>
        <Image style={{width:124,height:124}} source={require('./images/tips.png')} />
        <Text style={styles.tipsText}>{this.state._tipsText}</Text>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
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
    position:'absolute',
    zIndex:9,
    left:85,
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
  },
  tipsText:{
    marginTop:10,
    fontSize: 22,
    color:'#FFFFFF',
  }
});
