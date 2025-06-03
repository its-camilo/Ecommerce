import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#fff',
    width,
    height,
  },
});
