import { StyleSheet } from 'react-native';

export const styled = (backgroundColor) => {
  return StyleSheet.create({
    SafeAreaView: {
      backgroundColor: backgroundColor,
      flex: 0.05, //antes era 0
    },
  });
};