import React from 'react';
import { View, Image, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';

export default function Splash() {
  // REMOVEMOS o useEffect e o useNavigation daqui!
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#EC0000" barStyle="light-content" />
      <Image 
        source={require('../../../assets/logo-santander.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EC0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
});