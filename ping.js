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

export default class PingView extends Component {
  static get defaultProps() {    
    return {
      title: 'PingView'      
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
      
      <View style={styles.flexContainer}>
        <View style={styles.cell2}>
          <TouchableHighlight
            onPress={() => _navigator.pop()}
            style={styles.navBarLeftButton}>
            <Image style={{width:60,height:60}} source={require('./images/back.png')} />
          </TouchableHighlight>
        </View>
        <View style={styles.cell3}>
          <Text style={styles.t1Text}>
            www.bukade.com
          </Text>
          <Text style={styles.t2Text}>
            122.228.200.66
          </Text>
        </View>
        <View style={styles.cell2}>
          <TouchableHighlight
            onPress={() => _navigator.pop()}
            style={styles.navBarLeftButton}>
            <Image style={{width:60,height:60}} source={require('./images/refresh.png')} />
          </TouchableHighlight>
        </View>
      </View>
      
      <View style={styles.flexContainer2}>
        <View style={styles.cell}>
          <Text style={styles.time}>
            12ms
          </Text>
          <Text style={styles.title}>
            最小响应时间
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.time}>
            15ms
          </Text>
          <Text style={styles.title}>
            平均响应时间
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.time}>
            40ms
          </Text>
          <Text style={styles.title}>
            最大响应时间
          </Text>
        </View>
      </View>

      <View style={styles.flexContainer2}>
        <View style={styles.cell2}>
          <Text style={styles.title}>
            已发送：24
          </Text>
        </View>
        <View style={styles.cell2}>
          <Text style={styles.title}>
            已接收：20
          </Text>
        </View>
        <View style={styles.cell2}>
          <Text style={styles.title}>
            丢失：4
          </Text>
        </View>
        <View style={styles.cell2}>
          <Text style={styles.title}>
            丢失率：15%
          </Text>
        </View>
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
  flexContainer: {
    flexDirection: 'row',
    marginTop:15,
    padding:5
  },
  flexContainer2: {
    flexDirection: 'row',
    padding:5
  },
  cell: {
    flex: 1,
    margin: 5,
    height: 90,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor:'#FFFFFF',
  },
  cell2: {
    flex: 1,
    margin: 5,
    backgroundColor:'#FFFFFF',
  },
  cell3: {
    flex: 3,
    margin: 5,
    backgroundColor:'#FFFFFF',
  },
  time: {
    marginTop:15,
    fontSize: 20,
    textAlign: 'center',
    color: '#333333'
  },
  title: {
    marginTop:10,
    fontSize: 14,
    textAlign: 'center',    
    color: '#999999'
  },
  t1Text:{    
    fontSize: 22,
    color:'#3472ff',
    textAlign:'center'
  },
  t2Text:{
    marginTop:5,
    fontSize: 18,
    color:'#3472ff',
    textAlign:'center'
  },
});
