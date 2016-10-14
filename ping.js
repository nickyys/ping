import React, { Component } from 'react';
import { AppRegistry, StyleSheet, StatusBar, ScrollView,ListView, View, Image, Text, TouchableOpacity, BackAndroid } from 'react-native';

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
    fetch('http://ping.aizhan.com/api/client?domain='+this.props.ip)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.result),
        ip:responseData.ip,
        min:responseData.min,
        avg:responseData.avg,
        max:responseData.max,
        loaded: true,
      });
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  }

  render() {
    return (
      <View style={styles.scene}>
      <StatusBar
        backgroundColor='#FFFFFF'
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
            <Image style={{width:40,height:40}} source={require('./images/back.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.cell3}>
          <Text style={styles.t1Text}>
            {this.props.ip}
          </Text>
          <Text style={styles.t2Text}>
            {this.state.ip}
          </Text>
        </View>
        <View style={[styles.cell1,styles.buttonTop]}>
          <TouchableOpacity
            onPress={() => _navigator.pop()}
            style={styles.navBarLeftButton}>
            <Image style={{width:40,height:40}} source={require('./images/refresh.png')} />
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
          <Text style={styles.title}>
            已发送：24
          </Text>
        </View>
        <View style={styles.cell1}>
          <Text style={styles.title}>
            已接收：20
          </Text>
        </View>
        <View style={styles.cell1}>
          <Text style={styles.title}>
            丢失：4
          </Text>
        </View>
        <View style={styles.cell1}>
          <Text style={styles.title}>
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
          <Text style={styles.t3Text}>正在 Ping www.bukade.com [122.228.200.65]</Text>
          <Text style={styles.t3Text}>具有32字节的数据</Text>
        </View>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
          <Text style={styles.p1Text}>来自 122.228.200.66 的回复：字节=32 时间=36ms TTL=12</Text>
          }
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
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll:{
    marginTop:10,
    padding:5,
    backgroundColor: '#F4F4F4',
  },
  flexContainer: {
    flexDirection: 'row',
    marginTop:15,
    backgroundColor: '#FFFFFF'
  },
  flexContainer2: {
    flexDirection: 'row',
    padding:5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  cell: {
    flex: 1,
    margin: 5,
    height: 80,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor:'#FFFFFF',
  },
  cell1: {
    flex: 1,
    margin: 0,
    
    backgroundColor:'#FFFFFF',
  },
  cell2: {
    flex: 2,
    margin: 5,
    backgroundColor:'#FFFFFF',
  },
  cell3: {
    flex: 3,
    margin: 5,
    backgroundColor:'#FFFFFF',
  },
  time: {
    marginTop:10,
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
