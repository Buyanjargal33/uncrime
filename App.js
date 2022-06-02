import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

  const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

  const requestImeiPermission = async () =>{
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
          title: "Phone state permission",
          message: "Uncrime App needs access to your phone state",
          buttonNeutral: "Ask me later",
          buttonNegative: "Cancel",
          buttonPositive: "Ok"
        }
      );
      if(granted === PermissionsAndroid.RESULTS.GRANTED){
        try {
          const getImeiNumber = () =>{
            const IMEI = require('react-native-imei');
            IMEI.getImei().then(imeiList => {
              console.log(imeiList);
            })
          }
        } catch (error) {
          console.log(error);
        }
      }else{
        console.log("Permission denied");
      }
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TouchableOpacity onPress={requestImeiPermission}><Text>Click here</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
