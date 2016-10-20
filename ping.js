import React, { Component } from 'react';
import { AppRegistry, StyleSheet, StatusBar, ScrollView, ListView, View, Image, Text, TouchableOpacity, BackAndroid } from 'react-native';

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

//简单封装一个组件
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
  }

  constructor (props) {
    super (props)
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
    loaded: false,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    }
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
          loaded: true,
        });
      }else{
        this.setState({
          bg:'#ff2a2a',//红色 #f98001//橙色        
          c1:'#FFFFFF',
          c2:'#FFFFFF',
          s1:require('./images/back2.png'),
          s2:require('./images/refresh2.png'),
          ip:responseData.ip,        
          loaded: true,
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
            <TouchableOpacity style={{textAlign: 'right'}}
              onPress={() => _navigator.pop()}
              style={styles.navBarLeftButton}>
              <Image style={{width:40,height:40}} source={this.state.s2} />
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
            <CustomButton
              onPress={() => _navigator.pop()}
              src={require('./images/save.png')}
              text='保存图片'
            />
          </View>
          <View style={[styles.cell1,styles.buttonRight]}>
            <CustomButton
              onPress={() => _navigator.pop()}
              src={require('./images/share.png')}
              text='分享'
            />
          </View>
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
  
});
