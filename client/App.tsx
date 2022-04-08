import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {Body} from './components/Body';
import Header from './components/Header';
import {useAppSelector} from './reduxStorage/Hook';
import {Result} from './reduxStorage/slice';
import store from './reduxStorage/store';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.sectionContainer,
        {backgroundColor: isDarkMode ? Colors.black : Colors.white},
      ]}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [headerMsg, setHeaderMsg] = useState<string>('');
  const {results} = useAppSelector(state => state.fiboReducer);

  //Android emulators need to point to the ip adress not localhost.
  //In order to test the app correctly you need to add your ip adress
  const host =
    Platform.OS !== 'ios' ? 'http://192.168.100.5' : 'http://localhost';

  const baseUrl = `${host}:3001/api`;

  const getFetch = async () => {
    axios
      .get(baseUrl)
      .then(response => setHeaderMsg(response?.data?.message))
      .catch(error => {
        throw error;
      });
  };

  useEffect(() => {
    getFetch();
  }, []);

  const renderItems = ({item, index}: any) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: '#aaaabb',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}>
        <View style={styles.resultContainer}>
          <Text
            style={[
              styles.textStyle,
              {
                color: isDarkMode ? Colors.white : Colors.black,
                paddingRight: 50,
                paddingVertical: 20,
              },
            ]}>
            {`Serie: ${item.serie || ''}`}
          </Text>
          <Text
            style={[
              styles.textStyle,
              {
                color: isDarkMode ? Colors.white : Colors.black,
                paddingVertical: 20,
              },
            ]}>
            {`Res: ${item.result || ''}`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Header title={headerMsg} />
      <Section title="Calculate Fibonacci!">
        <Body baseUrl={baseUrl} />
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            maxHeight: 300,
          }}>
          <FlatList
            contentContainerStyle={{
              width: 350,
              flexDirection: 'column',
            }}
            data={results}
            renderItem={renderItems}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </Section>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 50,
    paddingHorizontal: 10,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: '700',
  },
  sectionDescription: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: '400',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  highlight: {
    fontWeight: '700',
  },
  textStyle: {
    color: 'black',
    fontSize: 18,
  },
  resultStyle: {
    color: 'black',
    fontWeight: '700',
    fontSize: 24,
  },
  resultContainer: {
    flexDirection: 'row',
    maxWidth: 300,
    height: 'auto',
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 5,
    paddingVertical: 10,
    maxHeight: 40,
    width: 160,
  },
  textInputContainer: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 8,
  },
});

export default AppWrapper;
