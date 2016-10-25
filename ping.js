import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, StyleSheet, StatusBar, ScrollView, ListView, View, Image, Text, TouchableOpacity, ToastAndroid, ActivityIndicator, BackAndroid, Dimensions } from 'react-native';

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
var WeChat=require('react-native-wechat');
var _navigator;
var STORAGE_KEY = '@ping:key';

//简单封装组件：底部按钮
class CustomButton extends React.Component {
  render() {
    return (
      <View style={styles.flexContainer2}>
        <View style={styles.cell1}>
        <Image style={{width:30,height:30}} source={this.props.src} />
        </View>
        <View style={styles.cell2}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

export default class PingView extends Component {
  static get defaultProps() {    
    return {
      title: 'PingView'      
    };
  }

  componentDidMount() {
    this.fetchData();
    this._getStorage();
  }

  constructor (props) {
    super (props)
    //应用注册
    WeChat.registerApp('wx8d560da3ba038e7e');

    _navigator = this.props.navigator;
    this.state = {
    bg:'#FFFFFF',
    c1:'#3472ff',
    c2:'#999999',
    s1: require('./images/back.png'),
    s2: require('./images/refresh.png'),
    ip:'',
    min:0,
    avg:0,
    max:0,
    result: '',
    animating: true,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    }
  }
  //获取历史记录并新增
  _getStorage() {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        ch='';
        if (value !== null){
          arr = new Array;
          arr = value.split(",");
          for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == this.props.ip) {
              arr.splice(0, 0, arr[i]);//新增
              arr.splice(i + 1, 1);//删除
              ch = arr.join(',');
              this._setStorage(ch);
              return false;
            }
            if (i >= 4) {
              arr.splice(i, 1);
              ch = arr.join(',');
            }
          }
          ch = this.props.ip+","+value;
        }else{
          ch=this.props.ip;
        }
        this._setStorage(ch);
      })
      .catch((error) => {
        console.warn(error);
      }).done();
  }
  //写入历史记录
  _setStorage(value) {    
    AsyncStorage.setItem(STORAGE_KEY, value)
      .then(() => {})
      .catch((error) => {
        console.warn(error);
      }).done();
  }


  fetchData(){
    fetch('http://10.10.0.78:82/api/client?domain='+this.props.ip)
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.status!="PING_LOSS"){
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.result),
          min:responseData.min,
          avg:responseData.avg,
          max:responseData.max,
          
          bg:'#08b35c',//绿色
          c1:'#FFFFFF',
          c2:'#FFFFFF',
          s1:require('./images/back2.png'),
          s2:require('./images/refresh2.png'),
          ip:responseData.ip,
          animating: false,//隐藏加载中
        });
      }else{
        this.setState({
          bg:'#ff2a2a',//红色 #f98001//橙色        
          c1:'#FFFFFF',
          c2:'#FFFFFF',
          s1:require('./images/back2.png'),
          s2:require('./images/refresh2.png'),
          ip:responseData.ip,
          animating: false,
        });        
      }
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  }

  render() {
    return (
      <View style={[styles.scene,{backgroundColor:this.state.bg}]}>
        <StatusBar
          backgroundColor={this.state.bg}
          barStyle='light-content'
          translucent={true}
          hidden={false}
          animated={true}
        />
        
        <View style={styles.flexContainer}>
          <View style={[styles.cell1,styles.buttonTop]}>
            <TouchableOpacity
              onPress={() => _navigator.pop()}
              style={styles.navBarLeftButton}>
              <Image style={{width:40,height:40}} source={this.state.s1} />
            </TouchableOpacity>
          </View>
          <View style={styles.cell3}>
            <Text style={[styles.t1Text,{color:this.state.c1}]}>
              {this.props.ip}
            </Text>
            <Text style={[styles.t2Text,{color:this.state.c1}]}>
              {this.state.ip}
            </Text>
          </View>
          <View style={[styles.cell1,styles.buttonTop]}>
            <TouchableOpacity
              onPress={() => {this.fetchData();this.setState({animating: true})}}
              style={styles.navBarLeftButton}>
              <Text style={{paddingRight:10,textAlign:"right"}}>
              <Image style={{width:40,height:40}} source={this.state.s2} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.flexContainer2}>
          <View style={styles.cell}>
            <Text style={styles.time}>
              {this.state.min}ms
            </Text>
            <Text style={styles.title}>
              最小响应时间
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.time}>
              {this.state.avg}ms
            </Text>
            <Text style={styles.title}>
              平均响应时间
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.time}>
              {this.state.max}ms
            </Text>
            <Text style={styles.title}>
              最大响应时间
            </Text>
          </View>
        </View>

        <View style={styles.flexContainer2}>
          <View style={styles.cell1}>
            <Text style={[styles.title,{color:this.state.c2}]}>
              已发送：24
            </Text>
          </View>
          <View style={styles.cell1}>
            <Text style={[styles.title,{color:this.state.c2}]}>
              已接收：20
            </Text>
          </View>
          <View style={styles.cell1}>
            <Text style={[styles.title,{color:this.state.c2}]}>
              丢失：4
            </Text>
          </View>
          <View style={styles.cell1}>
            <Text style={[styles.title,{color:this.state.c2}]}>
              丢失率：15%
            </Text>
          </View>
        </View>

        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={styles.scroll}>
          <View>
            <Text style={styles.t3Text}>正在 Ping {this.props.ip} [{this.state.ip}]</Text>
            <Text style={styles.t3Text}>具有32字节的数据</Text>
          </View>
          <ListView
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text style={styles.p1Text}>{rowData.text}</Text>}
          />
        </ScrollView>

        <View style={[styles.flexContainer2,styles.bottom]}>
          <View style={[styles.cell1,styles.buttonLeft]}>
            <TouchableOpacity onPress={() => _navigator.pop()}>
            <CustomButton              
              src={require('./images/save.png')}
              text='保存图片'
            />
            </TouchableOpacity>
          </View>
          <View style={[styles.cell1,styles.buttonRight]}>
            <TouchableOpacity onPress={() => {
              WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                  if (isInstalled) {
                    WeChat.shareToSession({type: 'text', description: '测试微信好友分享文本'})
                    .catch((error) => {
                      ToastAndroid.show(error.message,ToastAndroid.SHORT);
                    });
                  } else {
                    ToastAndroid.show('没有安装微信软件，请您安装微信之后再试',ToastAndroid.SHORT);
                  }
                });
              }}
              >
              <CustomButton
                src={require('./images/share.png')}
                text='分享'
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.container,{left:(Dimensions.get('window').width-50)/2,top:(Dimensions.get('window').height-50)/2}]}>
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, {height: 80}]}
          size="large" />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  scroll:{
    marginTop:10,
    padding:5,
    backgroundColor: '#F4F4F4'
  },
  flexContainer: {
    flexDirection: 'row',
    marginTop:15    
  },
  flexContainer2: {
    flexDirection: 'row',
    padding:5,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  cell: {
    flex: 1,
    margin: 5,
    height: 80,
    borderRadius:8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor:'#FFFFFF',
  },
  cell1: {
    flex: 1,
    margin: 0,
  },
  cell2: {
    flex: 2,
    margin: 5,
    backgroundColor:'#FFFFFF',
  },
  cell3: {
    flex: 3,
    margin: 5
  },
  time: {
    marginTop:15,
    marginBottom:5,
    fontSize: 20,
    textAlign: 'center',
    color: '#333333'
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999999'
  },
  t1Text:{    
    fontSize: 22,
    fontWeight: 'bold',
    color:'#3472ff',
    textAlign:'center'
  },
  t2Text:{
    fontSize: 18,
    color:'#3472ff',
    textAlign:'center'
  },
  t3Text:{
    paddingTop:5,
    paddingBottom:5,
    fontSize: 16,
    color:'#777777',
  },
  p1Text:{
    paddingTop:5,
    fontSize:12,
  },
  bottom:{
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    backgroundColor: '#FFFFFF'
  },
  buttonText:{    
    fontSize: 20,
  },
  buttonTop:{
    marginTop:10,
  },
  buttonLeft:{
    marginLeft:20,
    borderRightWidth: 1,
    borderRightColor: '#DDDDDD',
  },
  buttonRight:{
    marginLeft:30,
  },
  container: {
    position:'absolute',
    zIndex:99,
  },
  
});
