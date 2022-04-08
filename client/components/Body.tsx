import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import {useActions} from '../reduxStorage/slice';

interface BodyProps {
  baseUrl?: string;
}

export const Body = (props: BodyProps) => {
  const {baseUrl} = props;
  const isDarkMode = useColorScheme() === 'dark';
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const SliceActions = useActions();

  const getFibo = (fibo: string) => {
    axios
      .get(`${baseUrl}/fibo/${fibo}`)
      .then(response => {
        // Handling the error from the response
        if (response?.data?.error)
          Alert.alert(response?.data?.message, '', [
            {text: 'OK', onPress: () => setInput('')},
          ]);
        setResult(response?.data?.result);
        SliceActions.setCurrentResults(response?.data);
      })
      .catch(err => {
        throw err;
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={[
              styles.textInputStyle,
              {
                borderColor: isDarkMode ? Colors.white : Colors.black,
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}
            placeholder="0"
            placeholderTextColor="grey"
            value={input}
            onChangeText={setInput}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            getFibo(input);
            setInput('');
          }}
          style={styles.buttonContainer}>
          <Text style={styles.textStyle}>Calculate</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        <Text
          style={[
            styles.textStyle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          Fibonacci Result:{' '}
        </Text>
        <Text
          style={[
            styles.resultStyle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {result}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonContainer: {
    width: 150,
    height: 40,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 8,
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
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 50,
    paddingTop: 25,
    maxWidth: 250,
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
