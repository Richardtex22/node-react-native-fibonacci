import {ImageBackground, StyleSheet, Text, useColorScheme} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface HeaderProps {
  title?: string;
}

const Header = ({title}: HeaderProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ImageBackground
      accessibilityRole="image"
      testID="image-header"
      source={require('../Assets/Images/fibo.png')}
      style={[
        styles.background,
        {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
      ]}
      imageStyle={styles.logo}>
      <Text
        style={[
          styles.text,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    paddingBottom: 10,
    paddingTop: 56,
    paddingHorizontal: 32,
  },
  logo: {
    opacity: 0.3,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: -128,
    marginBottom: -50,
  },
  text: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Header;
