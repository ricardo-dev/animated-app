import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
} from 'react-native';


HEADER_MAX_H = 120
HEADER_MIN_H = 70
PROFILE_IMAGE_MAX_H = 80
PROFILE_IMAGE_MIN_H = 40

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      scrollY: new Animated.Value(0.0001)
    }
  }

  render() {

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0.0001, HEADER_MAX_H - HEADER_MIN_H],
      outputRange: [HEADER_MAX_H, HEADER_MIN_H],
      extrapolate:'clamp'
    })

    const profieHeight = this.state.scrollY.interpolate({
      inputRange: [0.0001, HEADER_MAX_H - HEADER_MIN_H],
      outputRange: [PROFILE_IMAGE_MAX_H, PROFILE_IMAGE_MIN_H],
      extrapolate:'clamp'
    })

    const profileImageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_H - HEADER_MIN_H],
      outputRange: [HEADER_MAX_H - (PROFILE_IMAGE_MAX_H / 2), 
        HEADER_MAX_H+5],
      extrapolate:'clamp'
    })

    const headerZIndex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_H - HEADER_MIN_H],
      outputRange: [0,1],
      extrapolate:'clamp'
    })

    const headerTitleBottom = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_H - HEADER_MIN_H,
        HEADER_MAX_H - HEADER_MIN_H + 5 + PROFILE_IMAGE_MIN_H,
        HEADER_MAX_H - HEADER_MIN_H + 5 + PROFILE_IMAGE_MIN_H + 26],
      outputRange: [-20,-20,-20,0],
      extrapolate:'clamp'
    })

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'lightskyblue',
          height: headerHeight,
          zIndex:headerZIndex,
          alignItems:'center',
        }}>
          <Animated.View
            style={{position:'absolute', bottom:headerTitleBottom}}>
            <Text style={{color:'#fff',fontSize:14, fontWeight:'bold',}}>Ricardo</Text>
          </Animated.View>
        </Animated.View>

        <ScrollView 
          scrollEventThrottle={16}
          onScroll={
            Animated.event(
              [{ nativeEvent : { contentOffset : { y: this.state.scrollY} } }]
            )}
          style={{flex:1}}>

          <Animated.View style={{
            height: profieHeight,
            width: profieHeight,
            borderRadius: PROFILE_IMAGE_MAX_H/2,
            borderColor:'#fff',
            borderWidth:3,
            overflow:'hidden',
            marginTop: profileImageMarginTop,
            marginLeft:10,
            //alignSelf:'center'

          }}>
            <Image 
              style={{flex:1, width:null, height:null}}
              source={require('./assets/img/anonymous-user.png')}></Image>
          </Animated.View>
          <View >
            <Text style={{
              fontWeight:'bold',
              fontSize:26,
              paddingLeft:10,
              color:'#000',
            }}>Ricardo Santos</Text>
          </View>
          <View style={{height:700}}>

          </View>
        </ScrollView>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});